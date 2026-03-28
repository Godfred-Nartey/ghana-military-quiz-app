import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { categoryApi } from '../api';

function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getActive,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/quiz/${category.id}`}
            className="card-hover p-6 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 mt-2">{category.description}</p>
                )}
              </div>
              {category.icon && (
                <span className="text-3xl">{category.icon}</span>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                {category.questionCount || 0} questions available
              </span>
            </div>
          </Link>
        ))}
      </div>

      {categories?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No categories available yet.</p>
        </div>
      )}
    </div>
  );
}

export default Categories;
