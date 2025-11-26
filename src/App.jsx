import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import PWABadge from './PWABadge';

// Pages
import SplashScreen from './pages/SplashScreen';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MensClothingPage from './pages/MensClothingPage';
import WomensClothingPage from './pages/WomensClothingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateProductPage from './pages/admin/CreateProductPage';
import EditProductPage from './pages/admin/EditProductPage';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  const { loading, isAdmin: isAdminUser } = useAuth();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-batik-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Splash Screen */}
        <Route path="/" element={<SplashScreen />} />
        
        {/* Auth Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Main App Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mens-clothing" element={<MensClothingPage />} />
          <Route path="/womens-clothing" element={<WomensClothingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes with Admin Layout */}
        {isAdminUser && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="product/create" element={<CreateProductPage />} />
            <Route path="product/edit/:id" element={<EditProductPage />} />
          </Route>
        )}

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* PWA Install Badge */}
      <PWABadge />
    </>
  );
}

export default App;