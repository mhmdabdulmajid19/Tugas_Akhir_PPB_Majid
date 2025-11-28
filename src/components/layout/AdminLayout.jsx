import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Plus, Home, ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoDashboard from '../../assets/logo_dashboard.png';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      path: '/admin',
      icon: LayoutDashboard,
      label: 'Dashboard',
      exact: true,
    },
    {
      path: '/admin/product/create',
      icon: Plus,
      label: 'Tambah Produk',
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header - Responsive */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Back to Home - Hidden on smallest screens */}
              <button
                onClick={() => navigate('/home')}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-batik-brown transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Kembali ke Home</span>
              </button>
              
              {/* Divider - Hidden on mobile */}
              <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
              
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <img 
                  src={logoDashboard} 
                  alt="AlMajid Batik Dashboard" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
                <span className="hidden md:inline ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                  ADMIN
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/home"
                className="flex items-center space-x-2 text-gray-600 hover:text-batik-brown transition-colors p-2"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar - Responsive */}
          <aside className={`
            fixed lg:relative inset-y-0 left-0 z-40
            lg:w-64 w-64 flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:block
          `}>
            <div className="h-full lg:h-auto bg-white rounded-xl shadow-sm p-4 space-y-2 lg:sticky lg:top-24">
              {/* Mobile Header */}
              <div className="flex lg:hidden items-center justify-between pb-4 border-b mb-4">
                <h3 className="font-bold text-gray-900">Menu Admin</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path, item.exact);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                        ${active
                          ? 'bg-batik-brown text-white font-semibold shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Only - Back to Home */}
              <div className="block sm:hidden pt-4 border-t">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    navigate('/home');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Kembali ke Home</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;