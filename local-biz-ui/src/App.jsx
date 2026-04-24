import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, ShoppingBag, Shirt, Cross, Wrench, Utensils, MapPin } from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'grocery', name: 'Grocery', icon: <ShoppingBag size={32} />, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'fashion', name: 'Fashion', icon: <Shirt size={32} />, color: 'text-purple-600 bg-purple-50' },
  { id: 'healthcare', name: 'Healthcare', icon: <Cross size={32} />, color: 'text-red-600 bg-red-50' },
  { id: 'services', name: 'Services', icon: <Wrench size={32} />, color: 'text-blue-600 bg-blue-50' },
  { id: 'restaurants', name: 'Restaurants', icon: <Utensils size={32} />, color: 'text-orange-600 bg-orange-50' },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
        {/* Red Map Pin to match Yelp vibe */}
        <MapPin className="text-red-600" fill="currentColor" size={28} />
        LocalConnect
      </Link>
      <div className="hidden md:flex gap-6 text-gray-600 font-medium items-center">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <Link to="/healthcare" className="flex items-center gap-1 hover:text-red-600 transition-colors">
           Healthcare Portal
        </Link>
        {/* Mock User Avatar */}
        <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm ml-4 shadow-sm">
          JD
        </div>
      </div>
    </div>
  </nav>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-fade-in">
      {/* Hero / Search Section - Red Theme */}
      <div className="bg-red-700 py-16 px-4 text-center text-white mb-12 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Support Local Businesses</h1>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Discover groceries, fashion, healthcare, and services right in your locality.
          </p>
          
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-full">
            <input 
              type="text" 
              placeholder="Search for a shop, service, or locality... (e.g., 'Coffee Shop')" 
              className="w-full py-4 pl-14 pr-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-400/50 transition-all text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-red-600" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-16">
        {/* Categories Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 border border-gray-100 hover:border-red-200 group cursor-pointer"
            >
              <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 group-hover:bg-red-50 group-hover:text-red-600 transition-all duration-300`}>
                {cat.icon}
              </div>
              <div className="text-center">
                <span className="font-bold text-gray-800 block">{cat.name}</span>
                <span className="text-xs text-gray-500 mt-1 block group-hover:text-red-500 transition-colors">View shops</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder for Step 2
const CategoryPage = () => (
  <div className="max-w-6xl mx-auto p-4 mt-8 text-center">
    <h2 className="text-2xl font-bold text-gray-400">Shop Listing (Step 2 goes here)</h2>
  </div>
);

// --- MAIN APP ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/healthcare" element={<CategoryPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}