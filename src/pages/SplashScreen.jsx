import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundPattern from '../components/splash/BackgroundPattern';
import FloatingElements from '../components/splash/FloatingElements';
import TitleSection from '../components/splash/TitleSection';
import LoadingAnimation from '../components/splash/LoadingAnimation';
import Footer from '../components/splash/Footer';
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    // Logo animation duration: 2 seconds
    const logoTimer = setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 2000);

    // Simulate loading progress after logo animation
    const progressTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }, 2000);

    // Navigate to auth page after everything completes
    const navigationTimer = setTimeout(() => {
      navigate('/auth');
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(progressTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-12 px-6">
        {/* Logo Animation Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Animated Logo Container */}
          <div className={`relative transition-all duration-1000 ease-out ${
            logoAnimationComplete 
              ? 'w-48 h-48' 
              : 'w-full h-full max-w-lg max-h-lg px-12'
          }`}>
            {/* Animated Ring - hanya muncul setelah animasi selesai */}
            {logoAnimationComplete && (
              <div className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="absolute inset-0 rounded-full border-4 border-batik-gold animate-ping opacity-20"></div>
                <div className="absolute inset-2 rounded-full border-4 border-batik-brown animate-ping opacity-30 delay-100"></div>
              </div>
            )}
            
            {/* Logo - fullscreen tanpa lingkaran, lalu dengan lingkaran setelah mengecil */}
            {!logoAnimationComplete ? (
              /* Logo Fullscreen - TANPA LINGKARAN */
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="AlMajid Batik" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            ) : (
              /* Logo Mengecil - DENGAN LINGKARAN */
              <div className="relative w-40 h-40 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-1000 ease-out">
                {/* Inner Circle */}
                <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-inner p-4">
                  {/* Logo Image */}
                  <img 
                    src={logo} 
                    alt="AlMajid Batik" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Decorative Dots */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-batik-gold rounded-full animate-bounce"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-batik-brown rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          {/* Title Section - fade in setelah logo mengecil */}
          {logoAnimationComplete && (
            <div className="animate-fade-in">
              <TitleSection />
            </div>
          )}
        </div>
        
        {/* Loading Animation - hanya muncul setelah logo animation */}
        {logoAnimationComplete && (
          <div className="space-y-6 animate-fade-in">
            <LoadingAnimation progress={progress} />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;