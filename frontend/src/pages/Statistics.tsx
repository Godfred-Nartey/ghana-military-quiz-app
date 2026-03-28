import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

function Statistics() {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['userStatistics'],
    queryFn: userApi.getStatistics,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const accuracy = statistics?.totalQuestionsAnswered
    ? Math.round((statistics.totalCorrectAnswers / statistics.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Statistics</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-primary-600">{statistics?.totalQuizzes}</p>
          <p className="text-gray-600">Total Quizzes</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-secondary-600">{statistics?.totalPoints}</p>
          <p className="text-gray-600">Total Points</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-gold-600">{accuracy}%</p>
          <p className="text-gray-600">Accuracy</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-accent-600">{statistics?.currentStreak}</p>
          <p className="text-gray-600">Current Streak</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Questions Answered</span>
              <span className="font-bold text-gray-900">{statistics?.totalQuestionsAnswered}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-bold text-green-600">{statistics?.totalCorrectAnswers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Incorrect Answers</span>
              <span className="font-bold text-red-600">
                {(statistics?.totalQuestionsAnswered || 0) - (statistics?.totalCorrectAnswers || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Time & Streaks</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Time Spent</span>
              <span className="font-bold text-gray-900">
                {Math.floor((statistics?.totalTimeSpent || 0) / 60)}m {(statistics?.totalTimeSpent || 0) % 60}s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-bold text-gray-900">{statistics?.currentStreak} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Longest Streak</span>
              <span className="font-bold text-gold-600">{statistics?.longestStreak} days</span>
            </div>
            {statistics?.lastQuizDate && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Quiz</span>
                <span className="font-bold text-gray-900">{statistics.lastQuizDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
