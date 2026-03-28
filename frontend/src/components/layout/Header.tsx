import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ghana Military Quiz</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {user?.role !== 'ADMIN' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/categories"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/leaderboard"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Leaderboard
                    </Link>
                    <Link
                      to="/achievements"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Achievements
                    </Link>
                  </>
                )}
                {user?.role === 'ADMIN' && (
                  <>
                    <Link
                      to="/admin"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/questions"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Questions
                    </Link>
                    <Link
                      to="/admin/categories"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/admin/users"
                      className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      Users
                    </Link>
                  </>
                )}
              </>
            ) : null}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-red-950/70 bg-red-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-950 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
