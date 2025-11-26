import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundPattern from '../components/splash/BackgroundPattern';
import FloatingElements from '../components/splash/FloatingElements';
import LogoContainer from '../components/splash/LogoContainer';
import TitleSection from '../components/splash/TitleSection';
import LoadingAnimation from '../components/splash/LoadingAnimation';
import Footer from '../components/splash/Footer';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Navigate to auth page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
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
        {/* Logo and Title Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <LogoContainer />
          <TitleSection />
        </div>
        
        {/* Loading Animation */}
        <div className="space-y-6">
          <LoadingAnimation progress={progress} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;