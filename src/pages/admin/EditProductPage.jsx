import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';
import { getProductById, updateProduct } from '../../services/productService';
import { useToast } from '../../contexts/ToastContext';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await getProductById(id);
      if (data) {
        setProduct(data);
      } else {
        showToast('Produk tidak ditemukan', 'error');
        navigate('/admin');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate, showToast]);

  const handleSubmit = async (productData) => {
    const { data, error } = await updateProduct(id, productData);
    
    if (error) {
      showToast('Gagal mengupdate produk: ' + error.message, 'error');
      return;
    }

    showToast('✅ Produk berhasil diupdate!', 'success');
    setTimeout(() => navigate('/admin'), 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 animate-spin text-batik-brown" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h2>
        <button onClick={() => navigate('/admin')} className="btn btn-primary">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center space-x-2 text-gray-600 hover:text-batik-brown mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Dashboard</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">✏️ Edit Produk</h1>
        <p className="text-gray-600">Update informasi produk: {product.name}</p>
      </div>

      <ProductForm 
        initialData={product} 
        onSubmit={handleSubmit} 
        submitLabel="Update Produk" 
      />
    </div>
  );
};

export default EditProductPage;