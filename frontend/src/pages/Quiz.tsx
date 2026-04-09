import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { quizApi, categoryApi } from '../api';
import { Question, AnswerOption } from '../types';

function Quiz() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerOption>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const [quizStartTime] = useState<number>(Date.now());
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryApi.getById(Number(categoryId)),
    enabled: !!categoryId,
  });

  const startQuizMutation = useMutation({
    mutationFn: () => quizApi.startQuiz({ categoryId: Number(categoryId)!, numberOfQuestions: 10 }),
    onSuccess: (data) => {
      setAttemptId(data.id);
      setTimeRemaining(data.totalQuestions * 30);
    },
    onError: (error: Error) => {
      console.error('Error starting quiz:', error.message);
      alert('Error starting quiz: ' + error.message);
    },
  });

  useEffect(() => {
    if (categoryId && !attemptId && !startQuizMutation.isPending) {
      startQuizMutation.mutate();
    }
  }, [categoryId, attemptId, startQuizMutation]);

  const { data: questions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['quiz-questions', attemptId],
    queryFn: () => quizApi.getQuestions(attemptId!),
    enabled: !!attemptId,
  });

  useEffect(() => {
    if (!attemptId) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptId]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswer = (questionId: number, answer: AnswerOption) => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setQuestionTimes((prev) => ({ ...prev, [questionId]: timeSpent }));
  };

  const handleSubmitQuiz = async () => {
    if (!attemptId || isSubmittingQuiz) return;

    try {
      setIsSubmittingQuiz(true);
      const totalElapsed = Math.round((Date.now() - quizStartTime) / 1000);
      const answeredCount = Object.keys(answers).length || 1;
      const avgTimePerQuestion = Math.round(totalElapsed / answeredCount);

      for (const [questionId, answer] of Object.entries(answers)) {
        await quizApi.submitAnswer(attemptId, {
          questionId: Number(questionId),
          userAnswer: answer,
          timeSpent: questionTimes[Number(questionId)] || avgTimePerQuestion,
        });
      }

      await quizApi.completeQuiz(attemptId);
      navigate(`/quiz/${attemptId}/results`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      const message = error instanceof Error ? error.message : 'Please try again.';
      alert(`Error submitting quiz: ${message}`);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const currentQuestion: Question | undefined = questions?.[currentQuestionIndex];

  if (startQuizMutation.isPending || isLoadingQuestions) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category?.name}</h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions?.length || 0}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${timeRemaining < 60 ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'}`}>
          <span className="font-mono text-xl font-bold">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / (questions?.length || 1)) * 100}%` }}
        ></div>
      </div>

      {currentQuestion && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-4">
            {[
              { key: 'A' as AnswerOption, text: currentQuestion.optionA },
              { key: 'B' as AnswerOption, text: currentQuestion.optionB },
              { key: 'C' as AnswerOption, text: currentQuestion.optionC },
              { key: 'D' as AnswerOption, text: currentQuestion.optionD },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleAnswer(currentQuestion.id, option.key)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === option.key
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <span className="font-bold mr-3">{option.key}.</span>
                {option.text}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0 || isSubmittingQuiz}
              className="btn-outline disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            {currentQuestionIndex < (questions?.length || 0) - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                disabled={isSubmittingQuiz}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={isSubmittingQuiz}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingQuiz ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
