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
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Avatar */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b">
            <div className="w-24 h-24 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.user_metadata?.full_name || 'User'}
              </h2>
              <p className="text-gray-600 flex items-center space-x-2 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
              <p className="text-lg text-gray-800">
                {user.user_metadata?.full_name || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg text-gray-800">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-lg text-gray-800 capitalize">
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