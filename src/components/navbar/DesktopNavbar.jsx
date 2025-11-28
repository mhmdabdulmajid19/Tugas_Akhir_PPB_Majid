import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { APP_NAME } from '../../utils/constants';
import logo from '../../assets/logo.png';

const DesktopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/mens-clothing', icon: ShoppingBag, label: "Men's Clothing" },
    { path: '/womens-clothing', icon: ShoppingBag, label: "Women's Clothing" },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt={APP_NAME} 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-batik-brown">
              {APP_NAME}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    active
                      ? 'bg-batik-brown/10 text-batik-brown font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 rounded-lg flex items-center space-x-2 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Admin</span>
              </button>
            )}
            
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                isActive('/profile')
                  ? 'bg-batik-brown/10 text-batik-brown font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" />
              <span>{user ? 'Profile' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;