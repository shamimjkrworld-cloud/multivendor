
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { mockApi } from '../services/mockApi';
import { Product } from '../types';
import { ChevronRight, Zap, ShieldCheck, Truck, Headphones, Star, TrendingUp, Heart } from 'lucide-react';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-16 pb-20 bg-gray-50/30">
      {/* Hero Banner */}
      <section className="relative h-[450px] md:h-[650px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center space-x-2 mb-6">
               <span className="w-12 h-0.5 bg-orange-600"></span>
               <span className="text-orange-600 font-black text-sm uppercase tracking-[0.3em]">Mohammadpur's Pride</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              A Better <br /> <span className="text-orange-500">Bangla</span> Shop
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-lg leading-relaxed font-medium">
              Authentic luxury fashion, fresh groceries, and state-of-the-art electronics from Dhaka's finest merchants.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/shop" className="px-12 py-5 bg-orange-600 text-white font-black rounded-full shadow-[0_20px_50px_rgba(234,88,12,0.3)] hover:bg-orange-700 transition-all transform hover:-translate-y-1 text-lg">Browse Catalog</Link>
              <Link to="/sell-on-tracketo" className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-lg border-2 border-transparent">Merchant Portal</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[2rem] p-10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 border">
          {[
            { icon: ShieldCheck, title: "100% Genuine", sub: "Verified Merchants", color: "text-blue-600" },
            { icon: Truck, title: "Flash Delivery", sub: "Lalmatia Local Hub", color: "text-green-600" },
            { icon: Zap, title: "Lowest Price", sub: "Direct From Source", color: "text-orange-600" },
            { icon: Headphones, title: "24/7 Support", sub: "Dedicated Helpline", color: "text-purple-600" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <item.icon className={`h-10 w-10 mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
              <h4 className="font-black text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-orange-600 rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                 <div className="p-2 bg-white/20 rounded-xl"><Zap className="h-6 w-6" /></div>
                 <h2 className="text-3xl font-black">Flash Sale Ending Soon</h2>
              </div>
              <p className="text-orange-100 text-lg max-w-md opacity-90 font-medium">Get up to 40% discount on selected Saree and Panjabi collections from Aarong and Tangail.</p>
           </div>
           <div className="flex gap-4 relative z-10">
              <div className="bg-black/20 backdrop-blur p-4 rounded-3xl border border-white/10 text-center w-20">
                 <p className="text-2xl font-black">12</p>
                 <p className="text-[10px] uppercase font-bold text-orange-200">Hrs</p>
              </div>
              <div className="bg-black/20 backdrop-blur p-4 rounded-3xl border border-white/10 text-center w-20">
                 <p className="text-2xl font-black">45</p>
                 <p className="text-[10px] uppercase font-bold text-orange-200">Min</p>
              </div>
              <div className="bg-black/20 backdrop-blur p-4 rounded-3xl border border-white/10 text-center w-20">
                 <p className="text-2xl font-black">09</p>
                 <p className="text-[10px] uppercase font-bold text-orange-200">Sec</p>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-30"></div>
        </div>
      </section>

      {/* Featured Grid (45 items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-orange-600 font-black text-sm uppercase mb-3">
              <TrendingUp className="h-4 w-4" />
              <span>Global Trend</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Dhaka's Curated Catalog</h2>
          </div>
          <div className="flex space-x-3">
             <button className="px-6 py-3 bg-white border font-bold rounded-2xl text-sm hover:shadow-md transition-all">New Arrivals</button>
             <button className="px-6 py-3 bg-orange-600 text-white font-bold rounded-2xl text-sm shadow-xl hover:bg-orange-700 transition-all">Most Popular</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-100 h-[380px] rounded-[2rem] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Mohammadpur Spotlight */}
      <section className="bg-gray-900 py-24 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
           <div className="flex-1">
              <h2 className="text-5xl font-black mb-8 leading-tight">Lalmatia Local Spotlight</h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">We are proud to serve the Mohammadpur community. Every order from Lalmatia gets priority dispatch and exclusive local discounts.</p>
              <div className="space-y-6">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-600 rounded-2xl"><Star className="h-6 w-6" /></div>
                    <p className="font-bold">Verified local vendors from Lalmatia Block D</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600 rounded-2xl"><Heart className="h-6 w-6" /></div>
                    <p className="font-bold">Support small businesses in Mohammadpur</p>
                 </div>
              </div>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center border border-white/10 hover:bg-orange-600 transition-all cursor-pointer">
                 <span className="text-4xl mb-4">📍</span>
                 <p className="font-black text-lg">Pick-up Points</p>
                 <p className="text-xs text-gray-500 mt-2">Available in Block C</p>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center border border-white/10 hover:bg-blue-600 transition-all cursor-pointer">
                 <span className="text-4xl mb-4">🚀</span>
                 <p className="font-black text-lg">1hr Delivery</p>
                 <p className="text-xs text-gray-500 mt-2">Lalmatia Exclusive</p>
              </div>
           </div>
        </div>
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </div>
  );
};
