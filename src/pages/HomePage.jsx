import { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import { getProducts } from '../services/productService';
import { Loader } from 'lucide-react';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      // Fetch lebih banyak produk unggulan untuk fitur "Lihat Semua"
      const { data } = await getProducts({ is_featured: true, limit: 50 });
      if (data) {
        setFeaturedProducts(data);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <div id="category-section">
        <CategorySection />
      </div>

      {/* Featured Products */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Produk Unggulan
          </h2>
          <p className="text-gray-600">
            Koleksi batik pilihan untuk Anda
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-batik-brown" />
          </div>
        ) : (
          <FeaturedProducts products={featuredProducts} />
        )}
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tentang AlMajid Batik
              </h2>
              <p className="text-gray-600 mb-4">
                AlMajid Batik adalah butik batik yang menyediakan koleksi batik berkualitas 
                tinggi untuk pria dan wanita. Kami berkomitmen untuk melestarikan warisan 
                budaya Indonesia melalui setiap desain batik yang kami tawarkan.
              </p>
              <p className="text-gray-600">
                Dengan motif tradisional dan modern, kami menghadirkan batik yang cocok 
                untuk berbagai acara, dari formal hingga kasual.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-batik-brown to-batik-gold p-6 rounded-xl text-white text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Produk Batik</div>
              </div>
              <div className="bg-gradient-to-br from-amber-600 to-orange-500 p-6 rounded-xl text-white text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-sm">Pelanggan Puas</div>
              </div>
              <div className="bg-gradient-to-br from-orange-600 to-red-500 p-6 rounded-xl text-white text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm">Motif Batik</div>
              </div>
              <div className="bg-gradient-to-br from-red-600 to-pink-500 p-6 rounded-xl text-white text-center">
                <div className="text-4xl font-bold mb-2">5★</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;