import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';
import logo from '../../assets/logo.png';

const RoleSelector = ({ onSelectRole }) => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Kelola produk dan katalog batik',
      icon: ShieldCheck,
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-600',
    },
    {
      id: 'user',
      title: 'Pengguna',
      description: 'Jelajahi dan simpan koleksi favorit',
      icon: User,
      color: 'from-batik-brown to-batik-gold',
      iconColor: 'text-batik-brown',
    },
  ];

  const handleRoleClick = (roleId) => {
    onSelectRole(roleId);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Logo diperbesar TANPA circle background - hanya logo */}
        <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
          <img 
            src={logo} 
            alt={APP_NAME} 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selamat Datang di {APP_NAME}
        </h2>
        <p className="text-gray-600">
          Pilih cara Anda ingin melanjutkan
        </p>
      </div>

      {/* Role Options */}
      <div className="space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleRoleClick(role.id)}
              className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-batik-brown transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-batik-brown transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {role.description}
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-batik-brown group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">atau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Quick Guest Access */}
      <p className="text-center text-sm text-gray-600">
        Ingin melihat katalog dulu?{' '}
        <button
          onClick={() => navigate('/home')}
          className="text-batik-brown font-medium hover:underline"
        >
          Lanjutkan sebagai Guest
        </button>
      </p>
    </div>
  );
};

export default RoleSelector;