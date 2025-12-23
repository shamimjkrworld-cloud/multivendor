
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard, VendorDashboard, UserDashboard } from './pages/Dashboards';
import { 
  AboutUs, PrivacyPolicy, TermsConditions, HelpCenter, 
  HowToBuy, ReturnsRefunds, ContactUs, AffiliateProgram, SellOnTracketo 
} from './pages/StaticPages';
import { UserRole } from './types';
// Added Mail and ShieldCheck to the lucide-react import
import { Mail, ShieldCheck } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: UserRole[] }> = ({ children, roles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    // Redirect to their specific dashboard if they're on the wrong one
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === UserRole.VENDOR) return <Navigate to="/vendor" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AuthForm: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const { user, login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRole>(UserRole.USER);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === UserRole.ADMIN) navigate('/admin');
      else if (user.role === UserRole.VENDOR) navigate('/vendor');
      else navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await login(email, role);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-gray-50/50">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 border shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-600 rounded-[1.5rem] flex items-center justify-center text-white font-black text-4xl mx-auto mb-8 shadow-2xl shadow-orange-600/30 -rotate-6">T</div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">{mode === 'login' ? 'Welcome Back!' : 'Join the Network'}</h2>
          <p className="text-gray-400 mt-3 font-medium uppercase text-[10px] tracking-[0.2em]">Authentic Bangladesh Storefront</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Email Terminal</label>
            <div className="relative">
              <Mail className="absolute left-6 top-4 h-5 w-5 text-gray-300" />
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@tracketo.com.bd"
                className="w-full bg-gray-50 border-2 border-transparent rounded-[1.25rem] pl-16 pr-6 py-4 outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all shadow-inner font-medium" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Secret Key</label>
            <div className="relative">
              <ShieldCheck className="absolute left-6 top-4 h-5 w-5 text-gray-300" />
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-transparent rounded-[1.25rem] pl-16 pr-6 py-4 outline-none focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all shadow-inner font-medium" 
              />
            </div>
          </div>
          
          <div className="pt-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 pl-1">Authentication Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setRole(UserRole.USER)}
                className={`py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest border-2 transition-all shadow-sm ${role === UserRole.USER ? 'border-orange-600 bg-orange-600 text-white shadow-orange-600/20' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-100'}`}
              >
                Customer
              </button>
              <button 
                type="button"
                onClick={() => setRole(UserRole.VENDOR)}
                className={`py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest border-2 transition-all shadow-sm ${role === UserRole.VENDOR ? 'border-orange-600 bg-orange-600 text-white shadow-orange-600/20' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-100'}`}
              >
                Merchant
              </button>
            </div>
          </div>

          {mode === 'login' && (
             <div className="pt-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Master Access (Debug)</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-gray-50 border-none rounded-[1.25rem] px-6 py-4 outline-none focus:ring-2 focus:ring-orange-600 appearance-none shadow-sm font-black text-xs uppercase tracking-widest text-gray-600 cursor-pointer"
              >
                <option value={UserRole.USER}>Standard User</option>
                <option value={UserRole.VENDOR}>Verified Merchant</option>
                <option value={UserRole.ADMIN}>Platform Superuser</option>
              </select>
             </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-gray-900 text-white font-black rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center text-sm uppercase tracking-[0.2em]"
          >
            {isSubmitting ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (mode === 'login' ? 'Authorize Session' : 'Register Account')}
          </button>
          
          <div className="text-center pt-4">
            <button 
              type="button"
              onClick={() => navigate(mode === 'login' ? '/register' : '/login')}
              className="text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-[0.2em] underline underline-offset-8"
            >
              {mode === 'login' ? "New to the hub? create account" : "Existing entity? sign in here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/admin" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/vendor" element={<ProtectedRoute roles={[UserRole.VENDOR]}><VendorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute roles={[UserRole.USER]}><UserDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/login" element={<AuthForm mode="login" />} />
                  <Route path="/register" element={<AuthForm mode="register" />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/how-to-buy" element={<HowToBuy />} />
                  <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/affiliate-program" element={<AffiliateProgram />} />
                  <Route path="/sell-on-tracketo" element={<SellOnTracketo />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
