
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, BadgeCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-orange-100">
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-md">
            Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">Stock Out</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          <span className="text-xs text-gray-500 hover:underline cursor-pointer">{product.vendorName}</span>
          {product.vendorVerified && <BadgeCheck className="h-3 w-3 text-blue-500" />}
        </div>
        
        <Link to={`/product/${product.id}`} className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors h-10">
          {product.name}
        </Link>

        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
          <span className="text-xs font-bold text-gray-700">{product.rating}</span>
          <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline space-x-1 mb-3">
            <span className="text-lg font-bold text-orange-600">৳{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-xs text-gray-400 line-through">৳{product.price}</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (!isOutOfStock) addToCart(product);
            }}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-sm ${
              isOutOfStock 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md active:scale-95'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
