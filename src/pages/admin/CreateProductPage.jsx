import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';
import { createProduct } from '../../services/productService';

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    const { data, error } = await createProduct(productData);
    
    if (error) {
      alert('Gagal membuat produk: ' + error.message);
      return;
    }

    alert('Produk berhasil dibuat!');
    navigate('/admin');
  };

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
        <h1 className="text-3xl font-bold mb-2">➕ Tambah Produk Baru</h1>
        <p className="text-gray-600">Lengkapi form di bawah untuk menambahkan produk batik</p>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Tambah Produk" />
    </div>
  );
};

export default CreateProductPage;