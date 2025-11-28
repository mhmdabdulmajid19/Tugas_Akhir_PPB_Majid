import { ShoppingBag, Sparkles } from 'lucide-react';
import logo from '../../assets/logo.png';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-batik-brown animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-4 border-batik-gold animate-pulse delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-batik-gold" />
              <span className="text-sm font-medium text-gray-700">
                Koleksi Batik Terbaru 2025
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Temukan
              <span className="block bg-gradient-to-r from-batik-brown to-batik-gold bg-clip-text text-transparent">
                Batik Berkualitas
              </span>
              untuk Anda
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-xl">
              Jelajahi koleksi batik pilihan dengan motif tradisional dan modern. 
              Cocok untuk segala acara, dari formal hingga kasual.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('featured-products')}
                className="btn btn-primary py-3 px-8 text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Lihat Produk Unggulan</span>
              </button>
              <button
                onClick={() => scrollToSection('category-section')}
                className="btn btn-primary py-3 px-8 text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Jelajahi Kategori</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center md:justify-start pt-8">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-batik-brown">500+</div>
                <div className="text-sm text-gray-600">Produk</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-batik-brown">50+</div>
                <div className="text-sm text-gray-600">Motif</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-batik-brown">⭐ 4.9</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Brand Card dengan Logo */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100">
              {/* Brand Card Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
                {/* Logo */}
                <div className="w-48 h-48 flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="AlMajid Batik" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Brand Name */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-batik-brown">
                    AlMajid Batik
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    Warisan Budaya Indonesia
                  </p>
                </div>

      
              </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-batik-brown to-batik-gold rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Terpercaya</div>
                  <div className="text-xs text-gray-600">Sejak 2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;