import { supabase } from '../config/api';
import { getUserIdentifier } from '../utils/helpers';

// Get reviews for a product
export const getProductReviews = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { data: null, error };
  }
};

// Create a review
export const createReview = async (reviewData, user) => {
  try {
    const identifier = getUserIdentifier(user);
    
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        ...reviewData,
        user_identifier: identifier,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating review:', error);
    return { data: null, error };
  }
};

// Update a review
export const updateReview = async (reviewId, updates) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating review:', error);
    return { data: null, error };
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting review:', error);
    return { error };
  }
};

// Get average rating for a product
export const getProductRating = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('average_rating, review_count')
      .eq('id', productId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product rating:', error);
    return { data: null, error };
  }
};