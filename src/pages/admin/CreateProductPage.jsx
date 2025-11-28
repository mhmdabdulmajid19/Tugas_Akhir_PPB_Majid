import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';
import { createProduct } from '../../services/productService';
import { useToast } from '../../contexts/ToastContext';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (productData) => {
    const { data, error } = await createProduct(productData);
    
    if (error) {
      showToast('Gagal membuat produk: ' + error.message, 'error');
      return;
    }

    showToast('✅ Produk berhasil dibuat!', 'success');
    setTimeout(() => navigate('/admin'), 1000);
  };

  return (
    <div>
      {/* Back Button - Responsive */}
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center space-x-2 text-gray-600 hover:text-batik-brown mb-4 sm:mb-6 p-2 -ml-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Kembali ke Dashboard</span>
      </button>

      {/* Header - Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">➕ Tambah Produk Baru</h1>
        <p className="text-sm sm:text-base text-gray-600">Lengkapi form di bawah untuk menambahkan produk batik</p>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Tambah Produk" />
    </div>
  );
};

export default CreateProductPage;