import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Loader, Share2, MessageCircle } from 'lucide-react';
import { getProductById } from '../services/productService';
import { getProductReviews } from '../services/reviewService';
import { formatCurrency } from '../utils/helpers';
import FavoriteButton from '../components/common/FavoriteButton';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import { useToast } from '../contexts/ToastContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      
      // Fetch product
      const { data: productData } = await getProductById(id);
      if (productData) {
        setProduct(productData);
        
        // Set default size
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
      }
      
      // Fetch reviews
      const { data: reviewsData } = await getProductReviews(id);
      if (reviewsData) {
        setReviews(reviewsData);
      }
      
      setLoading(false);
    };

    fetchProductData();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('✅ Link berhasil disalin!', 'success');
      } catch (err) {
        showToast('Gagal menyalin link', 'error');
      }
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    const phoneNumber = '6289647758245'; // Format internasional (62 = Indonesia)
    const message = `Halo, saya tertarik dengan produk:\n\n*${product.name}*\nSKU: ${product.sku}\nHarga: ${formatCurrency(product.price)}\n${selectedSize ? `Ukuran: ${selectedSize}` : ''}\nJumlah: ${quantity}\n\nApakah produk ini masih tersedia?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-batik-brown" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Parse images array - prioritas image_url jika images kosong
  const images = product.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images 
    : (product.image_url ? [product.image_url] : []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb & Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-batik-brown transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              {images.length > 0 && images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback jika gambar gagal load
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <div class="text-center">
                          <span class="text-8xl">👔</span>
                          <p class="text-lg text-gray-500 mt-4">Batik</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="text-center">
                    <span className="text-8xl">👔</span>
                    <p className="text-lg text-gray-500 mt-4">Batik</p>
                  </div>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_featured && (
                  <span className="bg-batik-gold text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    ⭐ Unggulan
                  </span>
                )}
                {product.stock <= 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Habis
                  </span>
                )}
              </div>

              {/* Favorite & Share */}
              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton productId={product.id} size="lg" />
                <button
                  onClick={handleShare}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-batik-brown shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {img ? (
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span class="text-2xl">👔</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">👔</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.categories && (
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-xl">{product.categories.icon}</span>
                <span className="text-sm font-medium">{product.categories.name}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 pb-6 border-b">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {product.average_rating ? Number(product.average_rating).toFixed(1) : '0.0'}
                </span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {product.review_count || 0} ulasan
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} stok tersedia` : 'Stok habis'}
              </span>
            </div>

            {/* Price */}
            <div>
              <p className="text-4xl font-bold text-batik-brown">
                {formatCurrency(product.price)}
              </p>
              {product.stock > 0 && product.stock <= 10 && (
                <p className="text-sm text-orange-500 font-medium mt-2">
                  ⚠️ Tersisa {product.stock} pcs
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              {product.material && (
                <div>
                  <p className="text-sm text-gray-500">Material</p>
                  <p className="font-medium">{product.material}</p>
                </div>
              )}
              {product.pattern && (
                <div>
                  <p className="text-sm text-gray-500">Motif</p>
                  <p className="font-medium">{product.pattern}</p>
                </div>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Pilih Ukuran</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-batik-brown bg-batik-brown text-white'
                          : 'border-gray-300 hover:border-batik-brown'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Jumlah</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-batik-brown font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-batik-brown font-semibold"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Order Button */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleWhatsAppOrder}
                disabled={product.stock <= 0}
                className="flex-1 btn btn-primary py-4 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{product.stock <= 0 ? 'Stok Habis' : 'Pesan via WhatsApp'}</span>
              </button>
            </div>

            {/* WhatsApp Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                📱 Untuk pemesanan bisa hubungi WhatsApp: <span className="font-semibold">089647758245</span>
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} reviews={reviews} />

        {/* Related Products */}
        <RelatedProducts categoryId={product.category_id} currentProductId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;