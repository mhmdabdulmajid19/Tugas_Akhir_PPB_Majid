import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RoleSelector from '../components/auth/RoleSelector';
import { ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
  };

  const handleBack = () => {
    if (!showRoleSelector) {
      setShowRoleSelector(true);
      setSelectedRole(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button - Hanya tampil saat sudah pilih role */}
        {!showRoleSelector && (
          <button
            onClick={handleBack}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-batik-brown transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        )}

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {showRoleSelector ? (
            <RoleSelector onSelectRole={handleRoleSelect} />
          ) : (
            <LoginForm role={selectedRole} />
          )}
        </div>

        {/* Footer Info */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Dengan melanjutkan, Anda menyetujui{' '}
          <span className="text-batik-brown font-medium">Syarat & Ketentuan</span>
          {' '}dan{' '}
          <span className="text-batik-brown font-medium">Kebijakan Privasi</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;