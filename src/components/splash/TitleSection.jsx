import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

const TitleSection = () => {
  return (
    <div className="text-center space-y-4 animate-fade-in">
      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-bold">
        <span className="bg-gradient-to-r from-batik-brown via-batik-gold to-batik-brown bg-clip-text text-transparent animate-gradient">
          {APP_NAME}
        </span>
      </h1>
      
      {/* Tagline */}
      <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto px-4">
        {APP_TAGLINE}
      </p>
      
      {/* Decorative Line */}
      <div className="flex items-center justify-center space-x-2 pt-4">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent to-batik-brown rounded-full"></div>
        <div className="w-2 h-2 bg-batik-gold rounded-full animate-pulse"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-batik-brown to-batik-gold rounded-full"></div>
        <div className="w-2 h-2 bg-batik-brown rounded-full animate-pulse delay-100"></div>
        <div className="w-12 h-1 bg-gradient-to-r from-batik-gold to-transparent rounded-full"></div>
      </div>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-500 italic pt-2">
        Warisan Budaya dalam Setiap Jahitan
      </p>
    </div>
  );
};

export default TitleSection;