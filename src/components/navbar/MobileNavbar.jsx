// src/components/navbar/MobileNavbar.jsx
import { useLocation, Link } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/home', 
      icon: Home, 
      label: 'Home',
      activeColor: 'text-amber-700',
      inactiveColor: 'text-gray-400'
    },
    { 
      path: '/mens-clothing', 
      icon: ShoppingBag, 
      label: 'Pria',
      activeColor: 'text-blue-700',
      inactiveColor: 'text-gray-400'
    },
    { 
      path: '/womens-clothing', 
      icon: ShoppingBag, 
      label: 'Wanita',
      activeColor: 'text-pink-700',
      inactiveColor: 'text-gray-400'
    },
    { 
      path: '/favorites', 
      icon: Heart, 
      label: 'Favorit',
      activeColor: 'text-red-700',
      inactiveColor: 'text-gray-400'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profil',
      activeColor: 'text-purple-700',
      inactiveColor: 'text-gray-400'
    },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                active ? 'transform scale-110' : ''
              }`}
            >
              <Icon 
                className={`w-6 h-6 mb-1 transition-colors ${
                  active ? item.activeColor : item.inactiveColor
                }`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-xs font-medium transition-colors ${
                active ? item.activeColor : item.inactiveColor
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavbar;