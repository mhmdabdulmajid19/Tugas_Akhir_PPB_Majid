import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Anda Belum Login
            </h2>
            <button
              onClick={() => navigate('/auth')}
              className="btn btn-primary"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">👤 Profil Saya</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                {user.user_metadata?.full_name || 'User'}
              </h2>
              <p className="text-gray-600 flex items-center justify-center sm:justify-start space-x-2 mt-1 text-sm sm:text-base">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
              <p className="text-base sm:text-lg text-gray-800 break-words">
                {user.user_metadata?.full_name || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-base sm:text-lg text-gray-800 break-all">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-base sm:text-lg text-gray-800 capitalize">
                {user.user_metadata?.role || 'user'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;