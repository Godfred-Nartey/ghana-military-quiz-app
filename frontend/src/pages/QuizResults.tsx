import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quizApi } from '../api';

function QuizResults() {
  const { attemptId } = useParams<{ attemptId: string }>();

  const { data: result, isLoading } = useQuery({
    queryKey: ['quiz-result', attemptId],
    queryFn: () => quizApi.getResult(Number(attemptId)),
    enabled: !!attemptId,
  });

  const percentage = result && result.totalQuestions > 0
    ? Math.round((result.correctAnswers / result.totalQuestions) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-gray-600">Here are your results</p>
      </div>

      {/* Score Card */}
      <div className="card p-8 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{result?.score}</p>
            <p className="text-sm text-gray-600">Score</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{result?.correctAnswers}</p>
            <p className="text-sm text-gray-600">Correct</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{result?.totalQuestions}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Time taken: {Math.floor((result?.timeTaken || 0) / 60)}m {(result?.timeTaken || 0) % 60}s</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Link to="/categories" className="btn-primary">
          Try Another Quiz
        </Link>
        <Link to="/dashboard" className="btn-outline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default QuizResults;
