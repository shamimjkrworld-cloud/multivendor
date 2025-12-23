
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingBag, Plus, Minus, ChevronLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-12 w-12 text-orange-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Let's find some great products!</p>
        <Link to="/shop" className="inline-block px-10 py-4 bg-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-2 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
        <span className="text-gray-400 font-medium">({totalItems} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gray-50 hidden md:grid md:grid-cols-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               <div className="col-span-6">Product Details</div>
               <div className="col-span-2 text-center">Price</div>
               <div className="col-span-2 text-center">Quantity</div>
               <div className="col-span-2 text-right">Total</div>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group">
                  <div className="col-span-12 md:col-span-6 flex items-center space-x-4">
                    <div className="h-24 w-24 bg-gray-50 rounded-2xl border p-2 shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Link to={`/product/${item.id}`} className="text-sm font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-1">{item.name}</Link>
                      <p className="text-[10px] text-gray-400 font-medium mt-1">Vendor: {item.vendorName}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-xs text-red-500 font-bold flex items-center space-x-1 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 text-center">
                    <p className="text-sm font-bold text-gray-900">${(item.discountPrice || item.price).toFixed(2)}</p>
                  </div>

                  <div className="col-span-4 md:col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-xl overflow-hidden bg-gray-50">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 text-gray-500"><Minus className="h-3 w-3" /></button>
                      <span className="px-4 text-sm font-bold w-12 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 text-gray-500"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-right">
                    <p className="text-sm font-bold text-orange-600">${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Link to="/shop" className="inline-flex items-center space-x-2 text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary */}
        <aside className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border shadow-lg sticky top-24">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping Estimate</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-bold text-gray-900">${(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-orange-600">${(totalPrice * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-700 hover:shadow-2xl transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 mb-6"
            >
              <span>Proceed to Checkout</span>
              <CreditCard className="h-5 w-5" />
            </button>

            <div className="space-y-4 pt-4 border-t">
               <div className="flex items-center space-x-3 text-xs text-gray-500">
                 <Truck className="h-4 w-4 text-orange-600" />
                 <span>Estimated Delivery: 3-5 business days</span>
               </div>
               <div className="flex items-center space-x-3 text-xs text-gray-500">
                 <ShieldCheck className="h-4 w-4 text-orange-600" />
                 <span>Secure 256-bit SSL encrypted payment</span>
               </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <p className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-2">Discount Code</p>
            <div className="flex space-x-2">
              <input type="text" placeholder="Enter code..." className="flex-1 bg-white border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
              <button className="px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-xl">Apply</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
