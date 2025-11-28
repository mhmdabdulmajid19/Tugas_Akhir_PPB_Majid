import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, ShoppingBag, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { getProducts, deleteProduct } from '../../services/productService';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { useToast } from '../../contexts/ToastContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await getProducts({});
    if (data) {
      setProducts(data);
      
      // Calculate stats
      const totalProducts = data.length;
      const totalStock = data.reduce((sum, p) => sum + (p.stock || 0), 0);
      const totalValue = data.reduce((sum, p) => sum + (p.price * p.stock || 0), 0);
      
      setStats({
        totalProducts,
        totalStock,
        totalValue,
      });
    }
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    // Use browser's confirm for now (will create custom modal later if needed)
    if (!window.confirm(`Yakin ingin menghapus produk "${name}"?`)) return;
    
    const { error } = await deleteProduct(id);
    if (!error) {
      showToast('✅ Produk berhasil dihapus!', 'success');
      fetchProducts();
    } else {
      showToast('Gagal menghapus produk: ' + error.message, 'error');
    }
  };

  const statsCards = [
    {
      title: 'Total Produk',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Stok',
      value: stats.totalStock,
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Nilai Inventori',
      value: formatCurrency(stats.totalValue),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Kelola produk dan katalog batik</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => navigate('/admin/product/create')}
            className="btn btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Products Table - Responsive */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-bold">Semua Produk</h2>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-batik-brown border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">Belum ada produk. Mulai tambahkan produk baru.</p>
            <button
              onClick={() => navigate('/admin/product/create')}
              className="btn btn-primary w-full sm:w-auto"
            >
              Tambah Produk Pertama
            </button>
          </div>
        ) : (
          <>
            {/* Mobile View - Card Layout */}
            <div className="block lg:hidden divide-y divide-gray-200">
              {products.map((product) => (
                <div key={product.id} className="p-4 hover:bg-gray-50">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl">👔</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{product.categories?.icon}</span>
                        <span className="text-sm text-gray-600">{product.categories?.name}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-batik-brown">
                            {formatCurrency(product.price)}
                          </p>
                          <p className="text-sm text-gray-600">Stok: {product.stock}</p>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                            product.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.is_available ? 'Aktif' : 'Nonaktif'}
                          </span>
                          {product.is_featured && (
                            <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Unggulan
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Lihat</span>
                        </button>
                        <button
                          onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                          className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 flex items-center justify-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl">👔</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span>{product.categories?.icon}</span>
                          <span className="text-sm text-gray-900">{product.categories?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.is_available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_available ? 'Aktif' : 'Nonaktif'}
                        </span>
                        {product.is_featured && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Unggulan
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Lihat"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-red-600 hover:text-red-900"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;