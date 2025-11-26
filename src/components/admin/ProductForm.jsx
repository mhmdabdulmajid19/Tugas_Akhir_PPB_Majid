import { useState, useEffect } from 'react';
import { Plus, X, Upload, Loader } from 'lucide-react';
import { CATEGORIES, SIZES, MATERIALS, PATTERNS, COLORS } from '../../utils/constants';
import { generateSKU } from '../../utils/helpers';

const ProductForm = ({ initialData, onSubmit, submitLabel = 'Simpan Produk' }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: CATEGORIES.MENS.id,
    price: '',
    stock: '',
    sku: '',
    image_url: '',
    sizes: [],
    colors: [],
    material: '',
    pattern: '',
    is_featured: false,
    is_available: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price?.toString() || '',
        stock: initialData.stock?.toString() || '',
        sizes: initialData.sizes || [],
        colors: initialData.colors || [],
      });
    } else {
      // Generate SKU for new product
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
    const categoryName = Object.values(CATEGORIES).find(c => c.id === categoryId)?.name || 'NEW';
    const newSKU = generateSKU(categoryId.substring(0, 3), formData.name || 'NEW');
    
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

  const toggleColor = (color) => {
    const colors = formData.colors.includes(color)
      ? formData.colors.filter(c => c !== color)
      : [...formData.colors, color];
    setFormData({ ...formData, colors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
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
          {/* Product Name */}
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

          {/* SKU */}
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

          {/* Category */}
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
              <option value={CATEGORIES.MENS.id}>
                {CATEGORIES.MENS.icon} {CATEGORIES.MENS.name}
              </option>
              <option value={CATEGORIES.WOMENS.id}>
                {CATEGORIES.WOMENS.icon} {CATEGORIES.WOMENS.name}
              </option>
            </select>
          </div>

          {/* Description */}
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
          {/* Price */}
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

          {/* Stock */}
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
          {/* Material */}
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

          {/* Pattern */}
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

          {/* Sizes */}
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
                      ? 'border-batik-brown bg-batik-brown text-white'
                      : 'border-gray-300 hover:border-batik-brown'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warna Tersedia
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor(color.name)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    formData.colors.includes(color.name)
                      ? 'border-batik-brown bg-batik-brown text-white'
                      : 'border-gray-300 hover:border-batik-brown'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Gambar Produk</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="input"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Masukkan URL gambar produk (sementara manual, fitur upload akan ditambahkan)
          </p>
          
          {/* Image Preview */}
          {formData.image_url && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="w-48 h-48 rounded-lg overflow-hidden border">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '';
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
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
              className="w-5 h-5 text-batik-brown focus:ring-batik-brown rounded"
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
              className="w-5 h-5 text-batik-brown focus:ring-batik-brown rounded"
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
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
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