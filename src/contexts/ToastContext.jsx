import { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

const Toast = ({ message, type = 'success', onClose, id }) => {
  const types = {
    success: {
      icon: CheckCircle,
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      progressBar: 'bg-green-300',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-gradient-to-r from-red-500 to-rose-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      progressBar: 'bg-red-300',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      progressBar: 'bg-yellow-300',
    },
    info: {
      icon: Info,
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      progressBar: 'bg-blue-300',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div
      className="min-w-[320px] max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 animate-slide-in"
    >
      {/* Colored Top Bar */}
      <div className={`${config.bg} h-2`}></div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`${config.iconBg} rounded-full p-2 flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          
          {/* Message */}
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 leading-relaxed">
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  };

  const hideToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => hideToast(toast.id)}
              id={toast.id}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};