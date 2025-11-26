import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { formatCurrency } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Placeholder Image - Replace with actual image */}
        <div
          onClick={handleClick}
          className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <span className="text-6xl">👔</span>
              <p className="text-sm text-gray-500 mt-2">Batik</p>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton productId={product.id} />
        </div>

        {/* Badge - Featured or New */}
        {product.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-batik-gold text-white shadow-lg">
              ⭐ Unggulan
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Stok Habis
            </span>
          </div>
        )}

        {/* Quick Action on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end justify-center">
          <button
            onClick={handleClick}
            className="bg-white text-batik-brown px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-batik-brown hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Lihat Detail</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div onClick={handleClick} className="p-4">
        {/* Category */}
        {product.categories && (
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-lg">{product.categories.icon}</span>
            <span className="text-xs text-gray-500 font-medium">
              {product.categories.name}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-batik-brown transition-colors">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.average_rating ? Number(product.average_rating).toFixed(1) : '0.0'}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.review_count || 0} ulasan)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-batik-brown">
              {formatCurrency(product.price)}
            </p>
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-xs text-orange-500 font-medium mt-1">
                Tersisa {product.stock} pcs
              </p>
            )}
          </div>
        </div>

        {/* Pattern Badge */}
        {product.pattern && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="inline-flex items-center text-xs text-gray-600">
              <span className="mr-1">🎨</span>
              Motif: {product.pattern}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;