import { useState, useEffect } from 'react';
import { Plus, X, Upload, Loader } from 'lucide-react';
import { SIZES, MATERIALS, PATTERNS } from '../../utils/constants';
import { generateSKU } from '../../utils/helpers';
import { supabase } from '../../config/api';
import { useToast } from '../../contexts/ToastContext';

const ProductForm = ({ initialData, onSubmit, submitLabel = 'Simpan Produk' }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    stock: '',
    sku: '',
    image_url: '',
    sizes: [],
    material: '',
    pattern: '',
    is_featured: false,
    is_available: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data && !error) {
        setCategories(data);
        if (!formData.category_id && data.length > 0) {
          setFormData(prev => ({ ...prev, category_id: data[0].id }));
        }
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price?.toString() || '',
        stock: initialData.stock?.toString() || '',
        sizes: initialData.sizes || [],
      });
    } else {
      const sku = generateSKU('BAT', 'NEW');
      setFormData(prev => ({ ...prev, sku }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find(c => c.id === categoryId);
    
    const categorySlug = category?.slug || 'bat';
    const newSKU = generateSKU(
      categorySlug.substring(0, 3).toUpperCase(), 
      formData.name || 'NEW'
    );
    
    setFormData({
      ...formData,
      category_id: categoryId,
      sku: newSKU,
    });
  };

  const toggleSize = (size) => {
    const sizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      showToast('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP', 'error');
      return;
    }

    if (file.size > maxSize) {
      showToast('Ukuran file maksimal 5MB', 'error');
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setFormData(prev => ({ ...prev, image_url: urlData.publicUrl }));
        showToast('Gambar berhasil diupload!', 'success');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Gagal mengupload gambar: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!formData.image_url) return;

    try {
      const url = new URL(formData.image_url);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(pathParts.indexOf('products')).join('/');

      await supabase.storage
        .from('product-images')
        .remove([filePath]);

      setFormData(prev => ({ ...prev, image_url: '' }));
      showToast('Gambar berhasil dihapus', 'info');
    } catch (error) {
      console.error('Error removing image:', error);
      showToast('Gagal menghapus gambar', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.category_id) {
      showToast('Kategori harus dipilih', 'warning');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category_id: formData.category_id,
    };

    await onSubmit(submitData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Informasi Dasar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Contoh: Kemeja Batik Parang Rusak"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="input bg-gray-50"
              placeholder="AUTO-GENERATED"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Kode unik produk</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleCategoryChange}
              className="input"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input"
              placeholder="Jelaskan detail produk, bahan, ukuran, dll..."
              required
            />
          </div>
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Harga & Stok</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input"
              placeholder="150000"
              min="0"
              step="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stok <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="input"
              placeholder="10"
              min="0"
              required
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Detail Produk</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="input"
            >
              <option value="">Pilih Material</option>
              {MATERIALS.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motif Batik
            </label>
            <select
              name="pattern"
              value={formData.pattern}
              onChange={handleChange}
              className="input"
            >
              <option value="">Pilih Motif</option>
              {PATTERNS.map(pattern => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ukuran Tersedia
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    formData.sizes.includes(size)
                      ? 'border-amber-700 bg-amber-700 text-white'
                      : 'border-gray-300 hover:border-amber-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Gambar Produk</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Gambar <span className="text-red-500">*</span>
            </label>
            
            {!formData.image_url ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-batik-brown transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-3"
                >
                  {uploading ? (
                    <>
                      <Loader className="w-12 h-12 text-batik-brown animate-spin" />
                      <p className="text-sm text-gray-600">Mengupload gambar...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                          Klik untuk upload gambar
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, atau WEBP (Max. 5MB)
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.image_url}
                    alt="Product preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Gambar akan disimpan di Supabase Storage
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atau Masukkan URL Gambar (Opsional)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="input"
              placeholder="https://example.com/image.jpg"
              disabled={uploading}
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Pengaturan</h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="w-5 h-5 text-amber-700 focus:ring-amber-700 rounded"
            />
            <div>
              <span className="font-medium text-gray-900">Produk Unggulan</span>
              <p className="text-sm text-gray-500">Tampilkan di halaman utama</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
              className="w-5 h-5 text-amber-700 focus:ring-amber-700 rounded"
            />
            <div>
              <span className="font-medium text-gray-900">Produk Tersedia</span>
              <p className="text-sm text-gray-500">Tampilkan produk di katalog</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn btn-secondary px-8"
          disabled={loading || uploading}
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading || uploading || !formData.image_url}
          className="btn btn-primary px-8 flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;