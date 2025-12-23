
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, BadgeCheck, Minus, Plus, Heart, ChevronRight } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setLoading(true);
      mockApi.getProductById(id).then(p => {
        if (p) {
          setProduct(p);
          setActiveImage(0);
          // Get related products from the same category
          const sameCategory = MOCK_PRODUCTS.filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);
          setRelated(sameCategory);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-200 aspect-square rounded-[3rem]"></div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded-2xl w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded-2xl w-1/4"></div>
          <div className="h-48 bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <h2 className="text-3xl font-black text-gray-900 mb-6">Oops! Product not found.</h2>
      <Link to="/shop" className="inline-block px-8 py-3 bg-orange-600 text-white font-bold rounded-full shadow-lg">Back to Shop</Link>
    </div>
  );

  const price = product.discountPrice || product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border-2 border-gray-50 shadow-xl group relative">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <button className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-gray-400 hover:text-red-500 transition-all active:scale-90">
              <Heart className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-orange-600 shadow-xl scale-105' : 'border-white shadow-sm hover:border-gray-200'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col py-4">
          <div className="border-b border-gray-100 pb-10 mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-xs font-black bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full uppercase tracking-widest">{product.category}</span>
              <div className="flex items-center space-x-1.5 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-black text-gray-700">{product.rating.toFixed(1)}</span>
                <span className="text-xs font-medium">({product.reviewsCount} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
               <p className="text-5xl font-black text-orange-600">৳{price}</p>
               {product.discountPrice && (
                 <div className="flex flex-col">
                   <p className="text-xl text-gray-400 line-through font-bold">৳{product.price}</p>
                   <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase w-fit mt-1">Save ৳{ product.price - product.discountPrice }</span>
                 </div>
               )}
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-10">{product.description}</p>

            <div className="flex items-center space-x-5 p-6 bg-gray-50 rounded-[2rem] border-2 border-white shadow-inner">
               <div className="flex items-center space-x-4 flex-1">
                 <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xl uppercase shadow-sm">
                   {product.vendorName.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-black text-gray-900 flex items-center space-x-1.5">
                     <span>{product.vendorName}</span>
                     {product.vendorVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                   </p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Verified Shop</p>
                 </div>
               </div>
               <div className="h-10 w-px bg-gray-200"></div>
               <div className="px-4">
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">In Stock</p>
                 <p className={`text-sm font-black ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {product.stock > 0 ? `${product.stock} Units Left` : 'Stock Out'}
                 </p>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border-4 border-gray-50 rounded-[1.5rem] bg-white shadow-sm overflow-hidden p-1">
                 <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-4 hover:bg-gray-50 text-gray-500 transition-colors rounded-xl"
                 >
                   <Minus className="h-5 w-5" />
                 </button>
                 <span className="px-8 font-black text-2xl min-w-[70px] text-center text-gray-900">{quantity}</span>
                 <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-4 hover:bg-gray-50 text-gray-500 transition-colors rounded-xl"
                 >
                   <Plus className="h-5 w-5" />
                 </button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-3 py-5 bg-orange-600 text-white font-black rounded-[1.5rem] shadow-2xl hover:bg-orange-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-xl"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-24">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Related Products</h2>
            <Link to="/shop" className="text-orange-600 text-sm font-black flex items-center hover:gap-2 transition-all">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
