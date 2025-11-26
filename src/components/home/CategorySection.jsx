import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: CATEGORIES.MENS.id,
      name: CATEGORIES.MENS.name,
      slug: CATEGORIES.MENS.slug,
      icon: CATEGORIES.MENS.icon,
      description: 'Koleksi batik pria untuk berbagai acara formal dan kasual',
      color: 'from-blue-500 to-indigo-600',
      image: '👔',
    },
    {
      id: CATEGORIES.WOMENS.id,
      name: CATEGORIES.WOMENS.name,
      slug: CATEGORIES.WOMENS.slug,
      icon: CATEGORIES.WOMENS.icon,
      description: 'Koleksi batik wanita yang elegan dan modern',
      color: 'from-pink-500 to-rose-600',
      image: '👗',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Jelajahi Kategori
        </h2>
        <p className="text-gray-600">
          Temukan batik yang sesuai dengan gaya Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/${category.slug}`)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{category.image}</span>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-batik-brown group-hover:to-batik-gold flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Content */}
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-batik-brown transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>

              {/* Badge */}
              <div className="mt-6 inline-flex items-center space-x-2 text-sm font-medium text-batik-brown">
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            {/* Decorative Pattern */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-batik-brown" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-batik-gold" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-batik-brown" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="text-2xl mb-2">🎨</div>
          <div className="text-sm font-semibold text-gray-800">50+ Motif</div>
          <div className="text-xs text-gray-500">Batik Tradisional</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="text-2xl mb-2">✨</div>
          <div className="text-sm font-semibold text-gray-800">Premium</div>
          <div className="text-xs text-gray-500">Kualitas Terjamin</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="text-2xl mb-2">🚚</div>
          <div className="text-sm font-semibold text-gray-800">Gratis Ongkir</div>
          <div className="text-xs text-gray-500">Min. Pembelian</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="text-2xl mb-2">💯</div>
          <div className="text-sm font-semibold text-gray-800">Original</div>
          <div className="text-xs text-gray-500">100% Asli</div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;