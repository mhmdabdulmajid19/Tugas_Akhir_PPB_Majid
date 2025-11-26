import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { isFavorited, toggleFavorite } from '../../services/favoriteService';

const FavoriteButton = ({ productId, size = 'md' }) => {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  // Size variants
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const { isFavorited: result } = await isFavorited(productId, user);
      setFavorited(result);
    };

    checkFavorite();
  }, [productId, user]);

  const handleToggle = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    setLoading(true);
    const { error } = await toggleFavorite(productId, user);
    
    if (!error) {
      setFavorited(!favorited);
    }
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        rounded-full bg-white/90 backdrop-blur-sm shadow-lg
        flex items-center justify-center
        hover:scale-110 active:scale-95
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`
          ${iconSizes[size]}
          transition-all duration-200
          ${favorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-600 group-hover:text-red-500'
          }
          ${loading ? 'animate-pulse' : ''}
        `}
      />
    </button>
  );
};

export default FavoriteButton;