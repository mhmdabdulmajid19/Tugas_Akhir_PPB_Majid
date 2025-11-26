const LoadingAnimation = ({ progress }) => {
  return (
    <div className="w-64 space-y-3">
      {/* Loading Text */}
      <div className="text-center">
        <p className="text-sm text-gray-600 font-medium animate-pulse">
          Memuat Koleksi Batik...
        </p>
      </div>
      
      {/* Progress Bar Container */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Progress Bar Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-batik-brown via-batik-gold to-batik-brown rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Glow Effect */}
        <div
          className="absolute top-0 left-0 h-full bg-batik-gold blur-sm opacity-50 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Progress Percentage */}
      <div className="text-center">
        <span className="text-xs text-gray-500 font-mono">
          {progress}%
        </span>
      </div>
      
      {/* Loading Dots */}
      <div className="flex justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-batik-brown rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-batik-gold rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-batik-brown rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;