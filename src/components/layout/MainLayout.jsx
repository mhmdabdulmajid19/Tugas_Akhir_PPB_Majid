import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import DesktopNavbar from '../navbar/DesktopNavbar';

const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/mens-clothing', icon: ShoppingBag, label: "Men's" },
    { path: '/womens-clothing', icon: ShoppingBag, label: "Women's" },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden bottom-nav safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav-item ${active ? 'active' : ''}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;