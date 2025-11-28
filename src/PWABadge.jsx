import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import logo from './assets/logo.png';

const PWABadge = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-4 max-w-sm border-2 border-batik-brown">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img 
                src={logo} 
                alt="AlMajid Batik" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Install AlMajid Batik</h3>
              <p className="text-sm text-gray-600">Akses lebih cepat & mudah</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 btn btn-primary py-2 text-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Nanti
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWABadge;