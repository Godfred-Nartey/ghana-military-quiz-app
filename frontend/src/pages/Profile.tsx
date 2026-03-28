import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { userApi } from '../api';

function Profile() {
  const { user } = useAuth();

  const { data: statistics } = useQuery({
    queryKey: ['userStatistics'],
    queryFn: userApi.getStatistics,
  });

  const { data: progress } = useQuery({
    queryKey: ['userProgress'],
    queryFn: userApi.getProgress,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Profile Info */}
      <div className="card p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-600">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.fullName}</h2>
            <p className="text-gray-600">@{user?.username}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{statistics?.totalQuizzes || 0}</p>
          <p className="text-sm text-gray-600">Quizzes</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{statistics?.totalPoints || 0}</p>
          <p className="text-sm text-gray-600">Points</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{statistics?.currentStreak || 0}</p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{statistics?.longestStreak || 0}</p>
          <p className="text-sm text-gray-600">Best Streak</p>
        </div>
      </div>

      {/* Progress by Category */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress by Category</h3>
        <div className="space-y-4">
          {progress?.map((item) => (
            <div key={item.categoryId} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{item.category?.name || `Category ${item.categoryId}`}</span>
                <span className="text-sm text-gray-600">{item.totalAttempts} attempts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${Math.min(item.averageScore, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Best: {item.bestScore}% | Avg: {item.averageScore}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
