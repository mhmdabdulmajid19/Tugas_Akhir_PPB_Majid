import { useEffect, useState } from 'react';
import { Heart, Loader, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { getFavorites } from '../services/favoriteService';

const FavoritesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const { data } = await getFavorites(user);
      
      if (data) {
        setFavorites(data);
      }
      
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Login untuk Melihat Favorit
            </h2>
            <p className="text-gray-500 mb-6">
              Simpan produk favorit Anda dengan login terlebih dahulu
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="btn btn-primary"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Heart className="w-12 h-12 fill-white" />
            <div>
              <h1 className="text-4xl font-bold">Produk Favorit</h1>
              <p className="text-red-100 mt-2">
                Koleksi batik yang Anda sukai
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-batik-brown" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Belum Ada Favorit
            </h2>
            <p className="text-gray-500 mb-6">
              Mulai tambahkan produk yang Anda sukai ke daftar favorit
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/mens-clothing')}
                className="btn btn-primary flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Batik Pria</span>
              </button>
              <button
                onClick={() => navigate('/womens-clothing')}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Batik Wanita</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {favorites.length} Produk Favorit
              </h2>
              <p className="text-gray-600 mt-1">
                Produk yang telah Anda simpan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <ProductCard 
                  key={favorite.id} 
                  product={favorite.products} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;