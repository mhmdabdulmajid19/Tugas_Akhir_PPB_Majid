const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center space-y-2 animate-fade-in">
      {/* Copyright */}
      <p className="text-xs text-gray-500">
        © {currentYear} AlMajid Batik. All rights reserved.
      </p>
      
      {/* Version */}
      <p className="text-xs text-gray-400">
        Version 1.0.0
      </p>
      
      {/* Made with Love */}
      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
        <span>Made with</span>
        <span className="text-red-500 animate-pulse">❤️</span>
        <span>in Indonesia</span>
      </div>
    </div>
  );
};

export default Footer;