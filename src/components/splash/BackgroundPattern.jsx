const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Batik Pattern Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-batik-brown animate-pulse"></div>
      <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-4 border-batik-gold animate-pulse delay-100"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full border-4 border-batik-brown animate-pulse delay-200"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full border-4 border-batik-gold animate-pulse delay-300"></div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-batik-brown/10 rotate-45 animate-spin-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-batik-gold/10 rotate-12 animate-spin-slow-reverse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-batik-brown/10 -rotate-45 animate-spin-slow"></div>
      
      {/* Decorative Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="2" fill="currentColor" className="text-batik-brown/20" />
            <circle cx="75" cy="75" r="2" fill="currentColor" className="text-batik-gold/20" />
            <circle cx="75" cy="25" r="2" fill="currentColor" className="text-batik-brown/20" />
            <circle cx="25" cy="75" r="2" fill="currentColor" className="text-batik-gold/20" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#batik-pattern)" />
      </svg>
    </div>
  );
};

export default BackgroundPattern;