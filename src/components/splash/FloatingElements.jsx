const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Batik Icons */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <span className="text-6xl opacity-30">👔</span>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float delay-200">
        <span className="text-5xl opacity-30">👗</span>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float delay-400">
        <span className="text-4xl opacity-30">✨</span>
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-float delay-600">
        <span className="text-5xl opacity-30">🎨</span>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-br from-batik-gold/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-tr from-batik-brown/20 to-transparent rounded-full blur-3xl animate-pulse delay-300"></div>
    </div>
  );
};

export default FloatingElements;