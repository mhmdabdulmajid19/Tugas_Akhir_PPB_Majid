import { useEffect, useState, useCallback } from 'react';
import { Loader } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import SearchBar from '../components/common/SearchBar';
import FilterPanel from '../components/common/FilterPanel';
import { getProducts } from '../services/productService';
import { CATEGORIES } from '../utils/constants';
import { debounce } from '../utils/helpers';

const MensClothingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    
    const queryFilters = {
      category_slug: CATEGORIES.MENS.slug, // Gunakan slug, bukan id
      search: searchTerm,
      sort: sortBy,
      ...filters,
    };

    // Apply price range filter
    if (filters.priceRange) {
      queryFilters.min_price = filters.priceRange.min;
      queryFilters.max_price = filters.priceRange.max;
    }

    const { data } = await getProducts(queryFilters);
    
    if (data) {
      // Client-side filtering for sizes, materials, patterns
      let filtered = data;
      
      if (filters.sizes?.length > 0) {
        filtered = filtered.filter(p => 
          p.sizes && filters.sizes.some(size => p.sizes.includes(size))
        );
      }
      
      if (filters.materials?.length > 0) {
        filtered = filtered.filter(p => 
          filters.materials.includes(p.material)
        );
      }
      
      if (filters.patterns?.length > 0) {
        filtered = filtered.filter(p => 
          filters.patterns.includes(p.pattern)
        );
      }
      
      setProducts(filtered);
    }
    
    setLoading(false);
  }, [searchTerm, sortBy, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 500);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">👔</span>
            <div>
              <h1 className="text-4xl font-bold">Batik Pria</h1>
              <p className="text-blue-100 mt-2">
                Koleksi batik pria untuk berbagai acara
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Cari batik pria..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterPanel
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="w-8 h-8 animate-spin text-batik-brown" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Tidak Ada Produk
                </h3>
                <p className="text-gray-500">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Menampilkan {products.length} produk
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MensClothingPage;