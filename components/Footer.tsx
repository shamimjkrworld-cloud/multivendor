
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl">T</div>
              <span className="text-2xl font-black tracking-tighter text-white">Tracketo<span className="text-orange-600">Shop</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              Bangladesh's premium multi-vendor experience. Connecting the finest merchants of Mohammadpur and Lalmatia to millions nationwide.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-orange-500 transition-all hover:scale-110"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-500 transition-all hover:scale-110"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-500 transition-all hover:scale-110"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-500 transition-all hover:scale-110"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-black mb-8 text-lg uppercase tracking-widest">Customer Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/help-center" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
              <li><Link to="/how-to-buy" className="hover:text-orange-500 transition-colors">Step-by-Step Shopping</Link></li>
              <li><Link to="/returns-refunds" className="hover:text-orange-500 transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact-us" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
              <li><Link to="/about-us" className="hover:text-orange-500 transition-colors">Our Origin Story</Link></li>
            </ul>
          </div>

          {/* Merchants */}
          <div>
            <h3 className="text-white font-black mb-8 text-lg uppercase tracking-widest">Business Hub</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/sell-on-tracketo" className="hover:text-orange-500 transition-colors">Sell on Tracketo</Link></li>
              <li><Link to="/affiliate-program" className="hover:text-orange-500 transition-colors">Affiliate Network</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Data Privacy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-orange-500 transition-colors">User Agreements</Link></li>
            </ul>
          </div>

          {/* Headquarters */}
          <div>
            <h3 className="text-white font-black mb-8 text-lg uppercase tracking-widest">Dhaka Office</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="p-3 bg-orange-600/10 rounded-xl"><MapPin className="h-5 w-5 text-orange-600 shrink-0" /></div>
                <span className="leading-relaxed">House 42, Block D, Road 7, Lalmatia, Mohammadpur, Dhaka 1207</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-orange-600/10 rounded-xl"><Phone className="h-5 w-5 text-orange-600 shrink-0" /></div>
                <span className="font-bold tracking-wider text-white">+880 1700-123456</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-orange-600/10 rounded-xl"><Mail className="h-5 w-5 text-orange-600 shrink-0" /></div>
                <span className="font-medium text-gray-400">hq@tracketo.com.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <p>© 2026 Tracketo Shop Bangladesh. Registered in Lalmatia.</p>
          <div className="flex space-x-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-30 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-30 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};
