// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import DesktopNavbar from '../navbar/DesktopNavbar';
import MobileNavbar from '../navbar/MobileNavbar';

const MainLayout = () => {
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

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileNavbar />
    </div>
  );
};

export default MainLayout;