import { useQuery } from '@tanstack/react-query';
import { achievementApi } from '../api';

function Achievements() {
  const { data: achievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: achievementApi.getActive,
  });

  const { data: userAchievements } = useQuery({
    queryKey: ['userAchievements'],
    queryFn: achievementApi.getUserAchievements,
  });

  const earnedIds = new Set(userAchievements?.map((ua) => ua.achievementId));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Achievements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements?.map((achievement) => {
          const isEarned = earnedIds.has(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`card p-6 ${isEarned ? 'border-2 border-gold-500' : 'opacity-60'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{achievement.name}</h3>
                  {achievement.description && (
                    <p className="text-gray-600 mt-1 text-sm">{achievement.description}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="badge-gold">+{achievement.points} pts</span>
                    <span className="text-xs text-gray-500">
                      {achievement.criteriaType}: {achievement.criteriaValue}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isEarned ? 'bg-gold-100' : 'bg-gray-100'
                  }`}
                >
                  {isEarned ? '🏆' : '🔒'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Achievements;
