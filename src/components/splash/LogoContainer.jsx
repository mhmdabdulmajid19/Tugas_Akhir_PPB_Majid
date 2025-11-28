import logo from '../../assets/logo.png';

const LogoContainer = () => {
  return (
    <div className="relative">
      {/* Animated Ring */}
      <div className="absolute inset-0 w-52 h-52 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="absolute inset-0 rounded-full border-4 border-batik-gold animate-ping opacity-20"></div>
        <div className="absolute inset-2 rounded-full border-4 border-batik-brown animate-ping opacity-30 delay-100"></div>
      </div>
      
      {/* Logo Circle */}
      <div className="relative w-40 h-40 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
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
    </div>
  );
};

export default LogoContainer;