import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { adminApi } from '../../api/endpoints/admin';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { Question, Category, AnswerOption, DifficultyLevel } from '../../types';

function ManageQuestions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    categoryId: 0,
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
    difficultyLevel: 'MEDIUM',
    points: 10,
    isActive: true,
  });
  const queryClient = useQueryClient();

  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['adminQuestions'],
    queryFn: adminApi.getAllQuestions,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['adminCategories'],
    queryFn: adminApi.getAllCategories,
  });

  const createMutation = useMutation({
    mutationFn: (
      data: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'timesAnswered' | 'timesCorrect'>
    ) => adminApi.createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminQuestions'] });
      setIsCreating(false);
      setError(null);
      setSuccess('Question created successfully!');
      setTimeout(() => setSuccess(null), 3000);
      setNewQuestion({
        categoryId: 0,
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        explanation: '',
        difficultyLevel: 'MEDIUM',
        points: 10,
        isActive: true,
      });
    },
    onError: (err: unknown) => {
      console.error('Create question error:', err);
      setSuccess(null);
      if (err instanceof Error) {
        setError(err.message || 'Failed to create question');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(String((err as { message: unknown }).message) || 'Failed to create question');
      } else {
        setError('Failed to create question - unknown error');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Question> }) =>
      adminApi.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminQuestions'] });
      setEditingQuestion(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminQuestions'] });
      setQuestionToDelete(null);
    },
  });

  const filteredQuestions =
    questions?.filter((question) => {
      const matchesSearch =
        question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.optionA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.optionB.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.optionC.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.optionD.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || 
  question.categoryId === selectedCategory || 
  (question as any).category?.id === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  const handleDelete = (question: Question) => {
    setQuestionToDelete(question);
  };

  const confirmDelete = () => {
    if (!questionToDelete || deleteMutation.isPending) {
      return;
    }

    deleteMutation.mutate(questionToDelete.id);
  };

  const cancelDelete = () => {
    if (deleteMutation.isPending) {
      return;
    }

    setQuestionToDelete(null);
  };

  const handleUpdate = (question: Question) => {
    updateMutation.mutate({
      id: question.id,
      data: {
        categoryId: question.categoryId,
        questionText: question.questionText,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        difficultyLevel: question.difficultyLevel,
        points: question.points,
        isActive: question.isActive,
      },
    });
  };

  const handleCreate = () => {
    console.log('handleCreate called');
    setError(null);
    setSuccess(null);
    console.log('Creating question with data:', newQuestion);
    console.log('Categories available:', categories);
    if (!newQuestion.categoryId || newQuestion.categoryId === 0) {
      setError('Please select a category');
      return;
    }
    if (
      !newQuestion.questionText ||
      !newQuestion.optionA ||
      !newQuestion.optionB ||
      !newQuestion.optionC ||
      !newQuestion.optionD
    ) {
      setError('Please fill in all required fields');
      return;
    }
    const dataToSend = newQuestion as Omit<
      Question,
      'id' | 'createdAt' | 'updatedAt' | 'timesAnswered' | 'timesCorrect'
    >;
    console.log('Sending data to API:', JSON.stringify(dataToSend));
    createMutation.mutate(dataToSend);
  };

  const getCategoryName = (categoryId: number) => {
    return categories?.find((cat) => cat.id === categoryId)?.name || 'Unknown';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Questions</h1>
        <p className="text-gray-600">Create and manage quiz questions</p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCategory || ''}
            onChange={(e) =>
              setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setIsCreating(true);
              setError(null);
              setSuccess(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Question
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {questionsLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questions...</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <motion.div
              key={question.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      {getCategoryName(question.categoryId)}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.difficultyLevel === 'EASY'
                          ? 'bg-green-100 text-green-800'
                          : question.difficultyLevel === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {question.difficultyLevel}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {question.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-500">{question.points} points</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {question.questionText}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div className={`p-2 rounded ${question.correctAnswer === 'A' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                      <span className="font-medium">A:</span> {question.optionA}
                    </div>
                    <div className={`p-2 rounded ${question.correctAnswer === 'B' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                      <span className="font-medium">B:</span> {question.optionB}
                    </div>
                    <div className={`p-2 rounded ${question.correctAnswer === 'C' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                      <span className="font-medium">C:</span> {question.optionC}
                    </div>
                    <div className={`p-2 rounded ${question.correctAnswer === 'D' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                      <span className="font-medium">D:</span> {question.optionD}
                    </div>
                  </div>
                  {question.explanation && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <span className="font-medium text-blue-800">Explanation:</span>{' '}
                      {question.explanation}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => setEditingQuestion(question)}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(question)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Answered {question.timesAnswered} times ({question.timesCorrect} correct)
                </span>
                <span>Updated {new Date(question.updatedAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <ConfirmationModal
        isOpen={!!questionToDelete}
        title="Delete Question"
        message={
          <div className="space-y-3">
            <p>Are you sure you want to delete this question?</p>
            {questionToDelete && (
              <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                "{questionToDelete.questionText}"
              </div>
            )}
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </div>
        }
        isLoading={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {isCreating && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Question</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreate();
                }}
              >
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-600">{success}</p>
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    required
                    value={newQuestion.categoryId}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Question Text *
                  </label>
                  <textarea
                    required
                    value={newQuestion.questionText}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, questionText: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the question"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option A *</label>
                    <input
                      type="text"
                      required
                      value={newQuestion.optionA}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, optionA: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Option A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option B *</label>
                    <input
                      type="text"
                      required
                      value={newQuestion.optionB}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, optionB: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Option B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option C *</label>
                    <input
                      type="text"
                      required
                      value={newQuestion.optionC}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, optionC: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Option C"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option D *</label>
                    <input
                      type="text"
                      required
                      value={newQuestion.optionD}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, optionD: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Option D"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Answer *
                  </label>
                  <select
                    required
                    value={newQuestion.correctAnswer}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        correctAnswer: e.target.value as AnswerOption,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Explanation</label>
                  <textarea
                    value={newQuestion.explanation}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, explanation: e.target.value })
                    }
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional explanation for the correct answer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                      value={newQuestion.difficultyLevel}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          difficultyLevel: e.target.value as DifficultyLevel,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Points</label>
                    <input
                      type="number"
                      value={newQuestion.points}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          points: parseInt(e.target.value) || 10,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setNewQuestion({
                        categoryId: 0,
                        questionText: '',
                        optionA: '',
                        optionB: '',
                        optionC: '',
                        optionD: '',
                        correctAnswer: 'A',
                        explanation: '',
                        difficultyLevel: 'MEDIUM',
                        points: 10,
                        isActive: true,
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {editingQuestion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Question</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editingQuestion);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    required
                    value={editingQuestion.categoryId}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Question Text *
                  </label>
                  <textarea
                    required
                    value={editingQuestion.questionText}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        questionText: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option A *</label>
                    <input
                      type="text"
                      required
                      value={editingQuestion.optionA}
                      onChange={(e) =>
                        setEditingQuestion({ ...editingQuestion, optionA: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option B *</label>
                    <input
                      type="text"
                      required
                      value={editingQuestion.optionB}
                      onChange={(e) =>
                        setEditingQuestion({ ...editingQuestion, optionB: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option C *</label>
                    <input
                      type="text"
                      required
                      value={editingQuestion.optionC}
                      onChange={(e) =>
                        setEditingQuestion({ ...editingQuestion, optionC: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Option D *</label>
                    <input
                      type="text"
                      required
                      value={editingQuestion.optionD}
                      onChange={(e) =>
                        setEditingQuestion({ ...editingQuestion, optionD: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Answer *
                  </label>
                  <select
                    required
                    value={editingQuestion.correctAnswer}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        correctAnswer: e.target.value as AnswerOption,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Explanation</label>
                  <textarea
                    value={editingQuestion.explanation || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        explanation: e.target.value,
                      })
                    }
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                      value={editingQuestion.difficultyLevel}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          difficultyLevel: e.target.value as DifficultyLevel,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Points</label>
                    <input
                      type="number"
                      value={editingQuestion.points}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          points: parseInt(e.target.value) || 10,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingQuestion.isActive}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          isActive: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingQuestion(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ManageQuestions;
