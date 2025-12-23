
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, User, Menu, Search, X, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'VENDOR') return '/vendor';
    return '/dashboard';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-2xl transition-transform group-hover:rotate-6">T</div>
            <span className="text-2xl font-black tracking-tighter text-gray-900 hidden sm:block">Tracketo<span className="text-orange-600">Shop</span></span>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="খুঁজুন পাঞ্জাবি, শাড়ি অথবা গ্রোসারি..."
                className="w-full bg-gray-100 border-none rounded-2xl py-3 px-12 focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium text-sm"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="text-gray-900 hover:text-orange-600 font-black text-sm uppercase tracking-widest transition-colors">Explore Collections</Link>
            
            <Link to="/cart" className="relative p-3 bg-gray-50 rounded-2xl text-gray-600 hover:text-orange-600 transition-all group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to={getDashboardPath()} 
                  className="flex items-center space-x-3 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm border border-orange-100"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">{user.role} PANEL</span>
                </Link>
                <button onClick={logout} className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 rounded-2xl transition-all">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-6 py-2.5 text-xs font-black uppercase text-gray-900 hover:text-orange-600 transition-colors tracking-widest">Sign In</Link>
                <Link to="/register" className="px-6 py-3 text-xs font-black uppercase bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all shadow-xl tracking-widest active:scale-95">Register Now</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="relative p-2.5 bg-gray-100 rounded-xl text-gray-600">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 bg-gray-900 text-white rounded-xl shadow-lg">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="relative">
             <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search Bangladesh's Best Shop..."
               className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-orange-500 outline-none"
             />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/shop" className="p-4 text-center border-2 border-gray-50 rounded-2xl font-black text-sm uppercase text-gray-700 bg-gray-50/50">Explore</Link>
            <Link to="/about-us" className="p-4 text-center border-2 border-gray-50 rounded-2xl font-black text-sm uppercase text-gray-700 bg-gray-50/50">Our Story</Link>
          </div>
          {user ? (
            <div className="space-y-3 pt-6 border-t">
              <Link 
                to={getDashboardPath()}
                className="flex items-center justify-center space-x-3 w-full text-center py-4 px-4 bg-orange-600 text-white rounded-2xl font-black shadow-xl"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>GO TO MY PANEL</span>
              </Link>
              <button onClick={logout} className="w-full py-4 px-4 text-red-600 font-black border-2 border-red-50 rounded-2xl bg-red-50/20">LOGOUT SESSION</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-6 border-t">
              <Link to="/login" className="py-4 text-center border-2 border-gray-100 rounded-2xl font-black uppercase text-gray-900">Sign In</Link>
              <Link to="/register" className="py-4 text-center bg-orange-600 text-white rounded-2xl font-black uppercase shadow-xl">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
