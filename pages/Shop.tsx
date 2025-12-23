
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { mockApi } from '../services/mockApi';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, Grid3X3, List } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    mockApi.getProducts().then(data => {
      let filtered = data;
      if (selectedCategory !== 'All') {
        filtered = data.filter(p => p.category === selectedCategory);
      }
      
      if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
      if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

      setProducts(filtered);
      setLoading(false);
    });
  }, [selectedCategory, sortBy]);

  const toggleCategory = (cat: string) => {
    const newCat = selectedCategory === cat ? 'All' : cat;
    setSelectedCategory(newCat);
    setSearchParams(newCat === 'All' ? {} : { category: newCat });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </h3>
              <button onClick={() => setSelectedCategory('All')} className="text-xs font-bold text-orange-600 hover:underline">Clear All</button>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Categories</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'All' ? 'bg-orange-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => toggleCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${selectedCategory === cat.name ? 'bg-orange-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">{cat.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            {/* Price Filter */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Price Range</p>
              <div className="flex items-center space-x-2">
                <input type="number" placeholder="Min" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-none focus:ring-1 focus:ring-orange-500" />
                <span className="text-gray-300">-</span>
                <input type="number" placeholder="Max" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <button className="w-full py-2 bg-gray-100 text-gray-800 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">Apply</button>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1 space-y-6">
          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">{products.length}</span> products</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 border rounded-lg p-1 bg-gray-50">
                <button className="p-1.5 rounded-md bg-white shadow-sm text-orange-600"><Grid3X3 className="h-4 w-4" /></button>
                <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600"><List className="h-4 w-4" /></button>
              </div>
              <div className="relative group">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border-none text-sm font-medium py-2 pl-4 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-80 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border shadow-sm">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SlidersHorizontal className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search keywords to find what you're looking for.</p>
              <button onClick={() => setSelectedCategory('All')} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all">Show All Products</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
