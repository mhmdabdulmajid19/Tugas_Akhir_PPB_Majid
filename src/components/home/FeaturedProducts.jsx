import { useNavigate } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Belum Ada Produk Unggulan
        </h3>
        <p className="text-gray-500 mb-6">
          Produk unggulan akan ditampilkan di sini
        </p>
        <button
          onClick={() => navigate('/mens-clothing')}
          className="btn btn-primary"
        >
          Lihat Semua Produk
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/mens-clothing')}
          className="inline-flex items-center space-x-2 px-8 py-3 bg-white border-2 border-batik-brown text-batik-brown rounded-xl font-semibold hover:bg-batik-brown hover:text-white transition-all duration-300 shadow-md hover:shadow-xl group"
        >
          <span>Lihat Semua Produk</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Decorative Element */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gray-50 px-6 py-2 rounded-full">
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-medium">Produk Pilihan Terbaik</span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;