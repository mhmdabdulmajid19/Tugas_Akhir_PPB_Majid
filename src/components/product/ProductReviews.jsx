import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createReview } from '../../services/reviewService';
import { formatDateTime } from '../../utils/helpers';

const ProductReviews = ({ productId, reviews }) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await createReview(
      {
        product_id: productId,
        rating,
        comment,
      },
      user
    );

    if (!error) {
      alert('Review berhasil ditambahkan!');
      setShowReviewForm(false);
      setComment('');
      setRating(5);
      window.location.reload(); // Refresh to show new review
    } else {
      alert('Gagal menambahkan review: ' + error.message);
    }

    setSubmitting(false);
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Ulasan Produk</h2>
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tulis Ulasan</span>
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Tulis Ulasan Anda</h3>

          {/* Rating Stars */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komentar
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="input"
              placeholder="Bagikan pengalaman Anda dengan produk ini..."
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary disabled:opacity-50"
            >
              {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="btn btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Belum ada ulasan untuk produk ini</p>
          {user && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn btn-primary mt-4"
            >
              Jadilah yang pertama memberikan ulasan!
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Rating Summary */}
          <div className="grid md:grid-cols-3 gap-8 pb-8 border-b">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-batik-brown mb-2">
                {(
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                ).toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} ulasan</p>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2 space-y-2">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b last:border-b-0 last:pb-0"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-batik-brown to-batik-gold rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.user_identifier?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {review.user_identifier || 'Anonymous'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(review.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;