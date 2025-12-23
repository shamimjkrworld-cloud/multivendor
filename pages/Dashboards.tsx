
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Order, Product, OrderStatus } from '../types';
import { mockApi } from '../services/mockApi';
// Added Heart to the import list
import { 
  Package, ShoppingBag, Users, DollarSign, TrendingUp, Clock, 
  CheckCircle, ChevronRight, Edit, Trash2, Plus, LogOut, ShieldCheck, 
  Home as HomeIcon, Settings, BarChart2, X, AlertCircle, Search, Filter,
  LayoutGrid, ShoppingCart, Tags, Layers, Star, MessageSquare, Megaphone,
  Bell, Moon, Globe, Sun, RefreshCcw, Eye, Download, Smartphone, Wallet,
  Zap, FileText, Menu, ChevronDown, Truck, Phone, Mail, CreditCard,
  Share2, MessageCircle, BarChart, Heart
} from 'lucide-react';
import { 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Link } from 'react-router-dom';

const ORDER_CHART_DATA = [
  { name: '2019', orders: 2 }, { name: '2020', orders: 5 }, { name: '2021', orders: 12 },
  { name: '2022', orders: 8 }, { name: '2023', orders: 20 }, { name: '2024', orders: 15 }, { name: '2025', orders: 30 }
];

const USER_OVERVIEW_DATA = [
  { name: 'Customer', value: 75, color: '#f43f5e' },
  { name: 'Shop', value: 15, color: '#3b82f6' },
  { name: 'Rider', value: 10, color: '#f97316' }
];

// --- SHARED SIDEBAR COMPONENT ---
const AdminSidebar = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const menuGroups = [
    {
      title: "POINT OF SALE",
      items: [{ id: 'pos', label: 'POS', icon: LayoutGrid }]
    },
    {
      title: "ONLINE ORDERS",
      items: [{ id: 'orders', label: 'Orders', icon: ShoppingCart }]
    },
    {
      title: "PRODUCT MANAGEMENT",
      items: [
        { id: 'product-management', label: 'Product Management', icon: Package },
        { id: 'purchase', label: 'Purchase', icon: ShoppingBag },
        { id: 'categories', label: 'Categories', icon: Layers },
        { id: 'attributes', label: 'Attributes', icon: Filter },
        { id: 'brands', label: 'Brands', icon: Tags },
      ]
    },
    {
      title: "SALE MANAGEMENT",
      items: [
        { id: 'flash-sales', label: 'Flash Sales', icon: Zap },
        { id: 'ads', label: 'Ads', icon: Megaphone },
        { id: 'coupon', label: 'Coupon', icon: Tags },
        { id: 'push-notification', label: 'Push Notification', icon: Bell },
        { id: 'blogs', label: 'Blogs', icon: FileText },
      ]
    },
    {
      title: "VENDOR MANAGEMENT",
      items: [
        { id: 'vendors', label: 'Users', icon: Users },
        { id: 'subscription', label: 'Subscription', icon: Star },
      ]
    },
    {
      title: "MESSAGES",
      items: [
        { id: 'live-messages', label: 'Live Messages', icon: MessageSquare },
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-40">
      <div className="p-6 border-b border-gray-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl">T</div>
        <div>
          <p className="text-xs font-black text-gray-400 leading-none tracking-tighter">Tracketo</p>
          <p className="text-sm font-black text-orange-600">Admin Panel</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 pb-12">
        <button 
          onClick={() => setView('overview')}
          className={`w-full flex items-center space-x-3 px-6 py-3 transition-all duration-200 ${view === 'overview' ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <BarChart2 className="h-4 w-4" />
          <span className="text-xs">Overview</span>
        </button>

        {menuGroups.map((group, idx) => (
          <div key={idx} className="mt-6">
            <p className="px-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 opacity-60">{group.title}</p>
            {group.items.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-6 py-2.5 text-xs transition-all duration-200 ${view === item.id ? 'text-orange-600 font-bold bg-orange-50/50' : 'text-gray-500 hover:text-orange-600 hover:bg-gray-50/50'}`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-4 w-4 ${view === item.id ? 'text-orange-600' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-3 w-3 transition-opacity ${view === item.id ? 'opacity-100' : 'opacity-20'}`} />
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
         <div className="flex gap-4 opacity-50">
            <Smartphone className="h-4 w-4" />
            <Globe className="h-4 w-4" />
            <Settings className="h-4 w-4" />
         </div>
         <span className="text-[10px] text-gray-400 font-bold">v1.4.2</span>
      </div>
    </aside>
  );
};

// --- ADMIN DASHBOARD ---
export const AdminDashboard = () => {
  const [view, setView] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    mockApi.getOrders(UserRole.ADMIN, '').then(setOrders);
    mockApi.getProducts().then(setProducts);
  }, []);

  // Sub-view renders
  const renderViewContent = () => {
    switch(view) {
      case 'overview': return renderOverview();
      case 'orders': return renderOrdersTable();
      case 'product-management': return renderProductsTable();
      case 'pos': return renderPlaceholder("POS System", "Real-time billing and inventory checkout interface.");
      case 'purchase': return renderPlaceholder("Purchase History", "Manage inbound stock and procurement.");
      case 'categories': return renderPlaceholder("Category Management", "Organize your shop's structure.");
      case 'attributes': return renderPlaceholder("Product Attributes", "Manage sizes, colors, and variations.");
      case 'brands': return renderPlaceholder("Brand Partners", "Manage verified manufacturer profiles.");
      case 'flash-sales': return renderPlaceholder("Flash Sales", "Configure time-limited high-impact campaigns.");
      case 'ads': return renderPlaceholder("Advertisement Manager", "Place and monitor in-app banners and promotions.");
      case 'vendors': return renderPlaceholder("Vendor Management", "Onboard and verify third-party merchants.");
      default: return renderPlaceholder(view.replace('-', ' ').toUpperCase(), "This section is currently under development for the Tracketo ecosystem.");
    }
  };

  const renderPlaceholder = (title: string, desc: string) => (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
        <Settings className="h-12 w-12 animate-spin-slow" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
        <p className="text-gray-500 max-w-sm mt-2">{desc}</p>
      </div>
      <button onClick={() => setView('overview')} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full shadow-xl hover:bg-orange-700 transition-all">Back to Overview</button>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 4 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Shops", val: "12", icon: HomeIcon, color: "bg-purple-50", text: "text-purple-600" },
          { label: "Total Products", val: products.length, icon: Package, color: "bg-blue-50", text: "text-blue-600" },
          { label: "Total Orders", val: orders.length, icon: ShoppingCart, color: "bg-red-50", text: "text-red-600" },
          { label: "Total Customers", val: "1,245", icon: Users, color: "bg-green-50", text: "text-green-600" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
             <div>
               <p className="text-2xl font-black text-gray-800">{item.val}</p>
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
             </div>
             <div className={`p-4 ${item.color} ${item.text} rounded-xl`}><item.icon className="h-6 w-6" /></div>
          </div>
        ))}
      </div>

      {/* Order Analytics Grid */}
      <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Order Analytics</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { label: "Pending", val: 23, icon: Clock, color: "text-orange-500" },
              { label: "Confirm", val: 1, icon: CheckCircle, color: "text-blue-500" },
              { label: "Processing", val: 4, icon: RefreshCcw, color: "text-purple-500" },
              { label: "Pickup", val: 1, icon: Package, color: "text-indigo-500" },
              { label: "On Way", val: 2, icon: Truck, color: "text-yellow-600" },
              { label: "Delivered", val: 15, icon: ShieldCheck, color: "text-green-600" },
              { label: "Cancelled", val: 0, icon: Trash2, color: "text-red-600" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-bold text-gray-400 group-hover:text-orange-600 transition-colors uppercase">{item.label}</p>
                   <ChevronRight className="h-3 w-3 text-gray-300" />
                </div>
                <div className="flex items-center gap-2">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <p className="text-xl font-black text-gray-800">{item.val}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Admin Wallet Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet className="h-24 w-24 -mr-6 -mt-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase mb-8 tracking-widest">Platform Wallet</p>
            <div className="space-y-6 relative z-10">
               <div className="flex items-end justify-between">
                  <div>
                     <p className="text-4xl font-black text-gray-900">৳{ (orders.reduce((a,b)=>a+b.total,0) * 0.1).toFixed(2) }</p>
                     <div className="flex items-center text-green-600 text-[10px] font-bold mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+18.5% This Month</span>
                     </div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase mt-4">Net Platform Revenue</p>
                  </div>
                  <div className="p-4 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-600/30"><DollarSign className="h-8 w-8" /></div>
               </div>
            </div>
         </div>
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Already Withdrawn", val: "৳12,400", icon: Share2, color: "text-green-600" },
              { label: "Pending Withdraw", val: "৳4,230", icon: Clock, color: "text-orange-600" },
              { label: "Total Commission", val: "৳28,950", icon: BarChart, color: "text-blue-600" },
              { label: "Rejected Requests", val: "৳0", icon: X, color: "text-red-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                 <div>
                   <p className="text-xl font-black text-gray-800">{stat.val}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wider">{stat.label}</p>
                 </div>
                 <stat.icon className={`h-5 w-5 ${stat.color} opacity-30`} />
              </div>
            ))}
         </div>
      </section>

      {/* Statistics & Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <p className="text-2xl font-black text-gray-900">{orders.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Order Volume</p>
               </div>
               <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['Daily', 'Monthly', 'Yearly'].map(t => (
                    <button key={t} className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${t === 'Yearly' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}`}>{t}</button>
                  ))}
               </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ORDER_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="orders" stroke="#ea580c" strokeWidth={4} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>
         <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="mb-10">
               <p className="text-2xl font-black text-gray-900">User Mix</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Userbase Overview</p>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="h-[200px] w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie data={USER_OVERVIEW_DATA} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                       {USER_OVERVIEW_DATA.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-2xl font-black text-gray-800">1.3k</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">Total Users</p>
                 </div>
              </div>
              <div className="space-y-4 mt-8">
                 {USER_OVERVIEW_DATA.map((item, i) => (
                   <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                         <span className="text-gray-500">{item.name}s</span>
                      </div>
                      <span className="text-gray-900">{item.value}%</span>
                   </div>
                 ))}
              </div>
            </div>
         </div>
      </section>

      {/* Order Summary Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Latest Global Orders</h3>
            <button onClick={() => setView('orders')} className="text-[10px] font-bold text-orange-600 hover:underline uppercase">View All Orders</button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b">
                <tr>
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Buyer Details</th>
                  <th className="px-8 py-5">Platform Store</th>
                  <th className="px-8 py-5">Date & Time</th>
                  <th className="px-8 py-5">Current Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-[11px] font-bold text-gray-600">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 text-gray-900 font-black">#{o.id.substring(4, 12)}</td>
                    <td className="px-8 py-6">
                       <p className="text-gray-900">{o.customerDetails.name}</p>
                       <p className="text-[9px] text-gray-400 font-medium">{o.customerDetails.phone}</p>
                    </td>
                    <td className="px-8 py-6 text-gray-400">Bangla Direct</td>
                    <td className="px-8 py-6">{new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase ${o.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${o.status === 'PENDING' ? 'bg-orange-600' : 'bg-blue-600'}`}></div>
                          {o.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-3">
                          <button className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-orange-600 hover:text-white transition-all"><Eye className="h-4 w-4" /></button>
                          <button className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Download className="h-4 w-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={6} className="py-20 text-center text-gray-400">No recent orders on the platform.</td></tr>
                )}
              </tbody>
           </table>
         </div>
      </section>

      {/* Bottom 3-Column Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Top Trending Shops */}
         <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[11px] font-black text-gray-500 uppercase mb-10 tracking-widest">Trending Stores</h3>
            <div className="space-y-8">
               {[
                 { name: "Aarong Premium", sales: 124, logo: "A" },
                 { name: "Lalmatia Spices", sales: 86, logo: "L" },
                 { name: "Walton Official", sales: 45, logo: "W" },
                 { name: "Green Grocer", sales: 32, logo: "G" },
               ].map((shop, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black">{shop.logo}</div>
                       <div>
                          <p className="text-[11px] font-black text-gray-900">{shop.name}</p>
                          <div className="flex items-center text-orange-400 mt-1">
                             {[...Array(5)].map((_, s) => <Star key={s} className="h-2.5 w-2.5 fill-current" />)}
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{shop.sales} Sales</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Most Favorite Products */}
         <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-[11px] font-black text-gray-500 uppercase self-start mb-10 tracking-widest">Hot Wishlist Items</h3>
            <div className="p-10 bg-gray-50 rounded-full mb-6">
              <Heart className="h-10 w-10 text-gray-200" />
            </div>
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Inventory Trends Loading...</p>
         </div>

         {/* Top Selling Products */}
         <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[11px] font-black text-gray-500 uppercase mb-10 tracking-widest">Top Selling Units</h3>
            <div className="space-y-6">
               {products.slice(0, 5).map((p, i) => (
                 <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 overflow-hidden">
                       <img src={p.images[0]} className="w-10 h-10 rounded-xl object-cover bg-gray-50 border border-gray-100" />
                       <div className="min-w-0">
                          <p className="text-[10px] font-black text-gray-900 truncate">{p.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">৳{p.price}</p>
                       </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                       <p className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Sold: {Math.floor(Math.random() * 50) + 10}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Admin Footer */}
      <footer className="pt-16 pb-8 border-t border-gray-100 flex flex-col items-center space-y-4">
         <div className="flex items-center space-x-12 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 hover:text-orange-600 cursor-pointer"><Phone className="h-3 w-3" /> +880 1711257498</div>
            <div className="flex items-center gap-2 hover:text-orange-600 cursor-pointer"><Mail className="h-3 w-3" /> help@tracketo.com.bd</div>
         </div>
         <p className="text-[10px] text-gray-300 font-black">© 2026 TRACKETO SHOP BD | POWERED BY RAZINSOFT | LALMATIA BRANCH</p>
      </footer>
    </div>
  );

  const renderOrdersTable = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom duration-500">
      <div className="p-8 border-b flex justify-between items-center bg-white sticky top-0 z-10">
        <h3 className="text-lg font-black text-gray-900">Online Order Master List</h3>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-100 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:bg-orange-600 hover:text-white transition-all">Export CSV</button>
          <button className="px-4 py-2 bg-orange-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg hover:bg-orange-700 transition-all">Filter View</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
            <tr>
              <th className="px-8 py-5">Order ID</th>
              <th className="px-8 py-5">Customer Details</th>
              <th className="px-8 py-5">Total Amount</th>
              <th className="px-8 py-5">Current Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-[12px] font-bold text-gray-700">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6 font-mono font-black">#{o.id.substring(4, 12)}</td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">{o.customerDetails.name.charAt(0)}</div>
                      <div>
                        <p>{o.customerDetails.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{o.customerDetails.phone}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 text-orange-600 font-black">৳{o.total.toLocaleString()}</td>
                <td className="px-8 py-6">
                   <select 
                    value={o.status}
                    className="bg-gray-100 border-none rounded-lg py-1 px-3 outline-none focus:ring-1 focus:ring-orange-600"
                    onChange={() => {}} 
                   >
                     <option value="PENDING">Pending</option>
                     <option value="CONFIRM">Confirm</option>
                     <option value="PROCESSING">Processing</option>
                     <option value="DELIVERED">Delivered</option>
                   </select>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-orange-600"><Eye className="h-4 w-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-blue-600"><Download className="h-4 w-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductsTable = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom duration-500">
      <div className="p-8 border-b flex justify-between items-center">
        <h3 className="text-lg font-black text-gray-900">Platform Inventory Manager</h3>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-black shadow-xl hover:bg-orange-700 transition-all">
          <Plus className="h-4 w-4" />
          <span>Add Master Item</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
            <tr>
              <th className="px-8 py-5">Product Name</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Unit Price</th>
              <th className="px-8 py-5">Stock Level</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-[12px] font-bold text-gray-700">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                      <img src={p.images[0]} className="w-10 h-10 rounded-xl object-cover bg-gray-50 border" />
                      <p className="truncate max-w-[200px]">{p.name}</p>
                   </div>
                </td>
                <td className="px-8 py-6 text-gray-400 uppercase text-[10px] tracking-widest">{p.category}</td>
                <td className="px-8 py-6 text-orange-600">৳{p.price}</td>
                <td className="px-8 py-6">
                   <span className={`px-2 py-1 rounded-md text-[10px] ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {p.stock} Units
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <AdminSidebar view={view} setView={setView} />
      
      <main className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between px-8">
           <div className="flex items-center gap-6">
              <button className="lg:hidden text-gray-500"><Menu className="h-6 w-6" /></button>
              <div>
                <h1 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Tracketo Management Console</h1>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Live Data Stream: {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="hidden md:flex items-center gap-3 border-l pl-6 border-gray-100">
                <Link to="/" className="text-[10px] font-black text-orange-600 uppercase hover:underline">Go to Storefront</Link>
                <ChevronRight className="h-3 w-3 text-gray-300" />
              </div>
           </div>
           
           <div className="flex items-center space-x-6">
              <div className="relative group hidden sm:block">
                 <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                 <input type="text" placeholder="Search Console..." className="bg-gray-100 border-none rounded-full py-2 pl-10 pr-6 text-xs outline-none focus:ring-1 focus:ring-orange-600 w-48 transition-all focus:w-64" />
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <Bell className="h-4 w-4 text-gray-400" />
                   <span className="absolute top-1 right-1 bg-red-500 text-white text-[7px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white animate-pulse">9+</span>
                 </div>
                 <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer hidden md:block">
                   <Moon className="h-4 w-4 text-gray-400" />
                 </div>
              </div>
              
              <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-gray-900 uppercase">{user?.name}</p>
                    <p className="text-[8px] text-orange-600 font-bold uppercase tracking-widest">Master Admin</p>
                 </div>
                 <button onClick={logout} className="relative group">
                    <img src={user?.avatar} className="h-9 w-9 rounded-xl bg-orange-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                 </button>
              </div>
           </div>
        </header>

        <div className="p-8 no-scrollbar overflow-y-auto max-h-[calc(100vh-64px)]">
           {renderViewContent()}
        </div>
      </main>
    </div>
  );
};

// --- VENDOR DASHBOARD ---
export const VendorDashboard = () => {
  const [view, setView] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) mockApi.getVendorProducts(user.id).then(setProducts);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-40">
        <div className="p-8 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black text-xl">T</div>
             <span className="text-xl font-black tracking-tighter">Merchant</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
           <button onClick={() => setView('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'overview' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <LayoutGrid className="h-4 w-4" />
              <span className="text-sm font-bold">Shop Stats</span>
           </button>
           <button onClick={() => setView('products')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'products' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Package className="h-4 w-4" />
              <span className="text-sm font-bold">Inventory</span>
           </button>
           <button onClick={() => setView('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'orders' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-bold">My Orders</span>
           </button>
        </div>
        <div className="p-8 border-t border-gray-50">
           <button onClick={logout} className="w-full py-4 text-red-500 font-black text-xs hover:bg-red-50/50 rounded-xl flex items-center justify-center gap-2">
             <LogOut className="h-4 w-4" />
             TERMINATE SESSION
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-12">
           <div>
              <h2 className="text-3xl font-black text-gray-900">Welcome, {user?.name}</h2>
              <p className="text-gray-500 font-medium">Manage your Tracketo storefront and fulfill orders.</p>
           </div>
           <button className="px-8 py-3 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:bg-orange-700 transition-all flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Product
           </button>
        </header>

        {view === 'overview' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Pending Payout</p>
                 <h3 className="text-5xl font-black mb-12">৳4,230.00</h3>
                 <button className="w-full py-4 bg-orange-600 rounded-2xl font-black text-sm hover:shadow-2xl transition-all">Withdraw to bKash</button>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-[60px]"></div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border shadow-sm flex flex-col justify-center">
                 <p className="text-gray-400 text-xs font-black uppercase mb-4 tracking-widest">Live Inventory</p>
                 <h3 className="text-4xl font-black text-gray-900">{products.length} Active Items</h3>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border shadow-sm flex flex-col justify-center">
                 <p className="text-gray-400 text-xs font-black uppercase mb-4 tracking-widest">Rating</p>
                 <div className="flex items-center gap-3">
                    <h3 className="text-4xl font-black text-gray-900">4.8</h3>
                    <div className="flex text-orange-400"><Star className="h-6 w-6 fill-current" /></div>
                 </div>
              </div>
           </div>
        )}

        {view === 'products' && (
           <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-10 py-5">Product</th>
                       <th className="px-10 py-5">Price</th>
                       <th className="px-10 py-5">Stock</th>
                       <th className="px-10 py-5 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y text-sm font-bold">
                    {products.map(p => (
                       <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-10 py-6 flex items-center gap-4">
                             <img src={p.images[0]} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                             <span className="max-w-[300px] truncate">{p.name}</span>
                          </td>
                          <td className="px-10 py-6 text-orange-600">৳{p.price}</td>
                          <td className="px-10 py-6">
                             <span className={`px-3 py-1 rounded-full text-[10px] ${p.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {p.stock} Units
                             </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="p-3 text-gray-400 hover:text-orange-600 transition-all"><Edit className="h-4 w-4" /></button>
                                <button className="p-3 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="h-4 w-4" /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}
      </main>
    </div>
  );
};

// --- USER DASHBOARD ---
export const UserDashboard = () => {
  const [view, setView] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) mockApi.getOrders(UserRole.USER, user.id).then(setOrders);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-40">
        <div className="p-8 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl">T</div>
             <span className="text-xl font-black tracking-tighter">My Account</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
           <button onClick={() => setView('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'overview' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <HomeIcon className="h-4 w-4" />
              <span className="text-sm font-bold">Summary</span>
           </button>
           <button onClick={() => setView('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'orders' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm font-bold">My Orders</span>
           </button>
           <button onClick={() => setView('settings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${view === 'settings' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Settings className="h-4 w-4" />
              <span className="text-sm font-bold">Profile</span>
           </button>
        </div>
        <div className="p-8 border-t border-gray-50">
           <button onClick={logout} className="w-full py-4 text-red-500 font-black text-xs hover:bg-red-50/50 rounded-xl flex items-center justify-center gap-2">
             <LogOut className="h-4 w-4" />
             LOGOUT ACCOUNT
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
        {view === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-500">
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                   <div>
                      <h2 className="text-5xl font-black mb-6">Shagotom, {user?.name}!</h2>
                      <p className="text-xl text-gray-400 max-w-md">You've reached <span className="text-orange-500 font-black">Elite Member</span> status. Enjoy free shipping in Lalmatia!</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-orange-500">Loyalty Points</p>
                      <h3 className="text-6xl font-black">1,450</h3>
                      <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold">Redeemable for ৳145 Discount</p>
                   </div>
                </div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
                   <h3 className="text-xl font-black mb-8 flex items-center justify-between">
                      <span>In-Transit Packages</span>
                      <Truck className="h-6 w-6 text-orange-600" />
                   </h3>
                   <div className="space-y-6">
                      {orders.filter(o => o.status === 'PENDING').map(o => (
                        <div key={o.id} className="p-6 bg-gray-50 rounded-[2rem] flex justify-between items-center border border-gray-100 group hover:border-orange-100 transition-all">
                           <div>
                              <p className="text-sm font-black text-gray-900">{o.id.substring(4, 12)}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(o.createdAt).toLocaleDateString()}</p>
                           </div>
                           <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-tighter">Awaiting Hub</span>
                        </div>
                      ))}
                      {orders.filter(o => o.status === 'PENDING').length === 0 && <p className="text-gray-400 text-sm italic py-4 text-center">No active deliveries. Ready for a new order?</p>}
                   </div>
                </div>
                <div className="bg-orange-600 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-center items-center text-center group">
                   <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="h-10 w-10" />
                   </div>
                   <h3 className="text-2xl font-black mb-4">Tracketo Secure Pay</h3>
                   <p className="text-orange-100 opacity-80 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Save your bKash or Nagad credentials for seamless one-click checkout across Mohammadpur stores.</p>
                   <button className="px-10 py-4 bg-white text-orange-600 font-black rounded-full hover:shadow-2xl transition-all active:scale-95">Connect Payment</button>
                </div>
             </div>
          </div>
        )}

        {view === 'orders' && (
           <div className="bg-white rounded-[3rem] border shadow-sm p-12 animate-in slide-in-from-bottom duration-500">
              <h3 className="text-3xl font-black mb-12">My Complete Purchase History</h3>
              <div className="space-y-8">
                 {orders.map(o => (
                   <div key={o.id} className="p-8 border-2 border-gray-50 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-orange-100 transition-all">
                      <div className="flex items-center space-x-6">
                         <div className="p-6 bg-orange-50 text-orange-600 rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-inner"><ShoppingBag className="h-8 w-8" /></div>
                         <div>
                            <p className="text-xl font-black text-gray-900">ORD-{o.id.substring(4, 10)}</p>
                            <p className="text-sm text-gray-400 font-black uppercase tracking-widest">{new Date(o.createdAt).toDateString()}</p>
                         </div>
                      </div>
                      <div className="text-center px-8 border-x border-gray-50">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Final Status</p>
                         <p className={`text-sm font-black uppercase tracking-tighter ${o.status === 'PENDING' ? 'text-orange-600' : 'text-green-600'}`}>{o.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-3xl font-black text-gray-900">৳{o.total.toLocaleString()}</p>
                         <button className="text-[10px] font-black text-blue-600 hover:underline mt-2 flex items-center gap-2 ml-auto uppercase tracking-widest"><Download className="h-3 w-3" /> Get Receipt</button>
                      </div>
                   </div>
                 ))}
                 {orders.length === 0 && (
                   <div className="py-20 text-center">
                     <ShoppingCart className="h-16 w-16 text-gray-100 mx-auto mb-6" />
                     <p className="text-gray-400 font-black uppercase tracking-widest">No order history found.</p>
                     <Link to="/shop" className="mt-8 inline-block px-10 py-4 bg-orange-600 text-white rounded-full font-black shadow-xl">Shop New Collections</Link>
                   </div>
                 )}
              </div>
           </div>
        )}
      </main>
    </div>
  );
};
