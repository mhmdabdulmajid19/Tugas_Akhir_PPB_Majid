const LogoContainer = () => {
  return (
    <div className="relative">
      {/* Animated Ring */}
      <div className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="absolute inset-0 rounded-full border-4 border-batik-gold animate-ping opacity-20"></div>
        <div className="absolute inset-2 rounded-full border-4 border-batik-brown animate-ping opacity-30 delay-100"></div>
      </div>
      
      {/* Logo Circle */}
      <div className="relative w-32 h-32 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
        {/* Inner Circle */}
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner">
          {/* Logo Text */}
          <div className="text-center">
            <span className="block text-4xl font-bold bg-gradient-to-r from-batik-brown to-batik-gold bg-clip-text text-transparent">
              A
            </span>
            <span className="block text-xs font-semibold text-batik-brown tracking-wider">
              BATIK
            </span>
          </div>
        </div>
        
        {/* Decorative Dots */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-batik-gold rounded-full animate-bounce"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-batik-brown rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LogoContainer;