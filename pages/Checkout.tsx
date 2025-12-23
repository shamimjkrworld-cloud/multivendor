
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../services/mockApi';
import { CheckCircle, Truck, CreditCard, MapPin, Phone, User, ChevronRight } from 'lucide-react';

const DISTRICTS = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

export const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    district: 'Dhaka',
    address: '',
    paymentMethod: 'cod'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setLoading(true);
    try {
      await mockApi.createOrder({
        userId: user?.id || 'guest',
        vendorId: items[0].vendorId,
        items,
        total: totalPrice,
        customerDetails: {
          name: formData.name,
          email: user?.email || 'guest@example.com',
          phone: formData.phone,
          address: `${formData.address}, ${formData.district}`
        }
      });
      setSuccess(true);
      clearCart();
    } catch (error) {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Shukriya! Your order has been received. You will receive a confirmation call shortly.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="px-10 py-4 bg-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-900">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Shipping Info */}
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="text-orange-600 h-5 w-5" /> 
              Shipping Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Rakib Hossain"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="017XXXXXXXX"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">District</label>
                  <select 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                  >
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Detailed Address</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="House, Road, Area"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Info */}
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-orange-600 h-5 w-5" /> 
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.paymentMethod === 'cod' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <p className="font-bold mb-1">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when you get it</p>
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'bkash'})}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.paymentMethod === 'bkash' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <p className="font-bold mb-1">Bkash / Nagad</p>
                <p className="text-xs text-gray-500">Fast & Secure Pay</p>
              </button>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading || items.length === 0}
            className="w-full py-5 bg-orange-600 text-white font-extrabold rounded-3xl shadow-xl hover:bg-orange-700 hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (
              <>Confirm Order <ChevronRight className="h-5 w-5" /></>
            )}
          </button>
        </form>

        {/* Order Summary */}
        <aside>
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 shadow-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-6 max-h-[300px] overflow-y-auto no-scrollbar mb-8">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-white/10 rounded-xl overflow-hidden p-1">
                    <img src={item.images[0]} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">৳{(item.discountPrice || item.price) * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery Charge</span>
                <span className="font-bold">৳60</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-extrabold text-orange-500">৳{totalPrice + 60}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-white/5 rounded-2xl text-[10px]">
              <Truck className="text-orange-500 h-5 w-5 shrink-0" />
              <p className="text-gray-400 leading-tight">Your package will be delivered within 3-5 working days by our verified courier partners.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
