import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { getProducts } from '../../services/productService';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      const { data } = await getProducts({
        category_id: categoryId,
        limit: 4,
      });

      if (data) {
        // Filter out current product
        const filtered = data.filter((p) => p.id !== currentProductId);
        setProducts(filtered);
      }

      setLoading(false);
    };

    if (categoryId) {
      fetchRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
        <div className="flex justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-batik-brown" />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;