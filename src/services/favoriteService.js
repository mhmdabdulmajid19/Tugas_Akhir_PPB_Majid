import { supabase } from '../config/api';
import { getUserIdentifier } from '../utils/helpers';

// Get user's favorites
export const getFavorites = async (user) => {
  try {
    const identifier = getUserIdentifier(user);
    
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        products (
          *,
          categories (
            name,
            slug
          )
        )
      `)
      .eq('user_identifier', identifier)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return { data: null, error };
  }
};

// Add product to favorites
export const addFavorite = async (productId, user) => {
  try {
    const identifier = getUserIdentifier(user);
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        product_id: productId,
        user_identifier: identifier,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding favorite:', error);
    return { data: null, error };
  }
};

// Remove product from favorites
export const removeFavorite = async (productId, user) => {
  try {
    const identifier = getUserIdentifier(user);
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('product_id', productId)
      .eq('user_identifier', identifier);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing favorite:', error);
    return { error };
  }
};

// Check if product is favorited
export const isFavorited = async (productId, user) => {
  try {
    const identifier = getUserIdentifier(user);
    
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('product_id', productId)
      .eq('user_identifier', identifier)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return { isFavorited: !!data, error: null };
  } catch (error) {
    console.error('Error checking favorite:', error);
    return { isFavorited: false, error };
  }
};

// Toggle favorite
export const toggleFavorite = async (productId, user) => {
  try {
    const { isFavorited: currentlyFavorited } = await isFavorited(productId, user);
    
    if (currentlyFavorited) {
      return await removeFavorite(productId, user);
    } else {
      return await addFavorite(productId, user);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { error };
  }
};