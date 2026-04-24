import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Shirt, Cross, Wrench, Utensils, MapPin, Pill, Stethoscope, Hospital, Activity, Eye, Phone, Clock, Globe, ArrowLeft, Star, CheckCircle, Info } from 'lucide-react';

// ==========================================================
// 1. DATA LAYER
// ==========================================================

const LOCALITIES = ['KumarBagh', 'KumarBagh Chowk', 'KumarBagh station', 'KumarBagh left side', 'KumarBagh right side'];
const MOCK_PHONE = '+91 XXXXXXXXXX';

const MOCK_SHOPS_DATA = [
  // --- GROCERY ---
  { id: 1, name: 'General Store', category: 'grocery', image: '/shops/general_store.jpg', locality: 'KumarBagh Chowk', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '08:00', closingTime: '22:00', rating: 4.2, reviews: 15, about: "Your one-stop shop for all daily grocery needs, fresh produce, and household essentials.", amenities: ["Offers delivery", "Offers take-out"], items: ["Rice & Wheat", "Fresh Vegetables", "Snacks", "Beverages"] },
  { id: 2, name: 'Guddu Ji Store', category: 'grocery', image: '/shops/Guddu ji store.jpg', locality: 'KumarBagh station', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '07:00', closingTime: '23:00', rating: 4.8, reviews: 124, about: "Locally owned grocery store providing quality staples for over 10 years.", amenities: ["Offers take-out", "Street Parking"], items: ["Spices", "Dairy Products", "Packaged Food"] },
  { id: 3, name: 'Fresh-Mart', category: 'grocery', image: '/shops/fresh-mart.jpg', locality: 'KumarBagh left side', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '10:00', closingTime: '20:00', rating: 3.9, reviews: 45, about: "Fresh organic vegetables and premium grocery items at affordable prices.", amenities: ["Wheelchair accessible", "Offers delivery"], items: ["Organic Fruits", "Cereals", "Cleaning Supplies"] },
  { id: 4, name: 'Paan Bhandar', category: 'grocery', image: '/shops/paan.jpg', locality: 'KumarBagh right side', phone: MOCK_PHONE, status: 'Timing not available', openingTime: '09:00', closingTime: '22:00', rating: 4.5, reviews: 88, about: "Famous local spot for refreshing paan, snacks, and mouth fresheners.", amenities: ["Offers take-out"], items: ["Sweet Paan", "Snacks", "Cold Drinks"] },

  // --- FASHION ---
  { id: 5, name: 'Fashion Market', category: 'fashion', image: '/shops/Fashon market.jpg', locality: 'KumarBagh', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '10:00', closingTime: '21:00', rating: 4.1, reviews: 56, about: "Latest trends in men's and women's apparel. Affordable fashion for everyone.", amenities: ["Fitting rooms", "Accepts Credit Cards"], items: ["T-Shirts", "Jeans", "Dresses", "Accessories"] },
  { id: 6, name: 'Urban Vastra', category: 'fashion', image: '/shops/URBAN.jpg', locality: 'KumarBagh Chowk', phone: MOCK_PHONE, status: 'Timing not available', openingTime: '11:00', closingTime: '20:00', rating: 4.6, reviews: 92, about: "Premium ethnic and western wear boutique.", amenities: ["Fitting rooms", "Tailoring available"], items: ["Kurtis", "Sarees", "Formal Wear"] },
  { id: 7, name: 'Fashion Trends', category: 'fashion', image: '/shops/fashion.jpg', locality: 'KumarBagh station', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '09:00', closingTime: '22:00', rating: 3.8, reviews: 34, about: "Quick fashion grabs, seasonal wear, and daily clothing.", amenities: ["Street Parking"], items: ["Winter Wear", "Kids Clothing", "Shoes"] },
  { id: 8, name: 'Sita Raghav Fashion', category: 'fashion', image: '/shops/Dhaba2.jpg', locality: 'KumarBagh left side', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '10:00', closingTime: '19:00', rating: 4.9, reviews: 210, about: "Traditional clothing and bridal wear specialists in the heart of the city.", amenities: ["Takes reservations", "Custom tailoring"], items: ["Lehengas", "Sherwanis", "Jewelry"] },

  // --- HEALTHCARE ---
  { id: 9, name: 'City Care Pharmacy', category: 'healthcare', subCategory: 'pharmacy', image: '/shops/pharmacy - Copy.jpg', locality: 'KumarBagh right side', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '00:00', closingTime: '23:59', distance: '1.2 km', rating: 4.7, reviews: 150, about: "24/7 pharmacy providing all prescribed medicines, health supplements, and first aid.", amenities: ["24/7 Open", "Home Delivery"], items: ["Prescription Meds", "Vitamins", "First Aid Kits"] },
  { id: 10, name: 'Vision Plus Optics', category: 'healthcare', subCategory: 'optics', image: '/shops/health.jpg', locality: 'KumarBagh', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '10:00', closingTime: '20:00', distance: '2.5 km', rating: 4.3, reviews: 75, about: "Expert eye testing and a wide range of designer frames and contact lenses.", amenities: ["Eye testing available", "Wheelchair accessible"], items: ["Eyeglasses", "Sunglasses", "Contact Lenses"] },
  { id: 11, name: 'Sunrise Dental Clinic', category: 'healthcare', subCategory: 'clinics', image: '/shops/shop1.jpg', locality: 'KumarBagh Chowk', phone: MOCK_PHONE, status: 'Timing not available', openingTime: '09:00', closingTime: '18:00', distance: '0.8 km', rating: 4.8, reviews: 89, about: "Comprehensive dental care including cleanings, fillings, and cosmetic dentistry.", amenities: ["Takes reservations", "Consultation available"], items: ["Teeth Cleaning", "Root Canal", "Whitening"] },
  { id: 12, name: 'Apollo MedLife', category: 'healthcare', subCategory: 'pharmacy', image: '/shops/sanudrugs.jpg', locality: 'KumarBagh station', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '08:00', closingTime: '23:00', distance: '3.1 km', rating: 4.5, reviews: 205, about: "Trusted brand pharmacy with guaranteed authentic medicines.", amenities: ["Offers delivery", "Accepts Credit Cards"], items: ["Medicines", "Baby Care", "Personal Care"] },
  { id: 13, name: 'Health & Wellness Center', category: 'healthcare', subCategory: 'hospitals', image: '/shops/Health and wellness center.jpg', locality: 'KumarBagh left side', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '00:00', closingTime: '23:59', distance: '4.5 km', rating: 4.0, reviews: 310, about: "Multi-specialty hospital equipped with modern healthcare facilities.", amenities: ["Emergency Room", "Ambulance Service", "Pharmacy Inside"], items: ["General Checkup", "Pathology Lab", "X-Ray/MRI"] },
  { id: 14, name: 'Uma Clinic', category: 'healthcare', subCategory: 'orthopedics', image: '/shops/umahomeoclinic.jpg', locality: 'KumarBagh right side', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '09:00', closingTime: '17:00', distance: '5.2 km', rating: 4.4, reviews: 62, about: "Specialized orthopedic and physiotherapy clinic for joint and bone health.", amenities: ["Takes reservations", "Physiotherapy available"], items: ["Joint Consultation", "Therapy", "Bone Density Test"] },

  // --- SERVICES ---
  { id: 15, name: 'Laundrywala', category: 'services', image: '/shops/laundry.jpg', locality: 'KumarBagh', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '07:00', closingTime: '20:00', rating: 4.6, reviews: 112, about: "Professional dry cleaning, washing, and ironing services with quick turnaround.", amenities: ["Home Pickup/Drop", "Express Service"], items: ["Dry Cleaning", "Wash & Fold", "Steam Ironing"] },
  { id: 16, name: 'Mobile Repairing', category: 'services', image: '/shops/mobile_repair.jpg', locality: 'KumarBagh Chowk', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '10:00', closingTime: '19:00', rating: 4.2, reviews: 84, about: "Expert repair for all smartphones, screen replacements, and software issues.", amenities: ["Quick Repair", "Warranty on Parts"], items: ["Screen Replacement", "Battery Change", "Accessories"] },
  { id: 17, name: 'Electronics Service', category: 'services', image: '/shops/lg.jpg', locality: 'KumarBagh station', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '11:00', closingTime: '19:00', rating: 3.7, reviews: 29, about: "Authorized service center for home appliances like TVs, ACs, and refrigerators.", amenities: ["Home Visit Available"], items: ["TV Repair", "AC Servicing", "Washing Machine Repair"] },

  // --- RESTAURANTS ---
  { id: 18, name: 'Classic Dhaba', category: 'restaurants', image: '/shops/dhaba.jpg', locality: 'KumarBagh left side', phone: MOCK_PHONE, status: 'Timing not available', openingTime: '06:00', closingTime: '23:59', rating: 4.7, reviews: 420, about: "Authentic roadside dhaba experience serving hot parathas, curries, and chai.", amenities: ["Outdoor Seating", "Good for Kids", "Offers take-out"], items: ["Paneer Butter Masala", "Dal Makhani", "Tandoori Roti"] },
  { id: 19, name: 'Gourmet Grill', category: 'restaurants', image: '/shops/Restaurant.jpg', locality: 'KumarBagh right side', phone: MOCK_PHONE, status: '🟢 Open', openingTime: '11:00', closingTime: '23:00', rating: 4.5, reviews: 275, about: "Premium dining experience featuring grilled specialties and international cuisines.", amenities: ["Takes reservations", "Air Conditioned", "Offers delivery"], items: ["Grilled Chicken", "Pasta", "Mocktails"] },
  { id: 20, name: 'Restro-Bistro', category: 'restaurants', image: '/shops/restro.jpg', locality: 'KumarBagh', phone: MOCK_PHONE, status: '🔴 Closed', openingTime: '12:00', closingTime: '21:00', rating: 4.1, reviews: 145, about: "Cozy cafe ambiance perfect for coffee dates and quick bites.", amenities: ["Free Wi-Fi", "Casual Dress"], items: ["Coffee", "Sandwiches", "Desserts"] },
];

const CATEGORIES = [
  { id: 'grocery', name: 'Grocery', icon: <ShoppingBag size={32} />, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'fashion', name: 'Fashion', icon: <Shirt size={32} />, color: 'text-purple-600 bg-purple-50' },
  { id: 'healthcare', name: 'Healthcare', icon: <Cross size={32} />, color: 'text-red-600 bg-red-50' },
  { id: 'services', name: 'Services', icon: <Wrench size={32} />, color: 'text-blue-600 bg-blue-50' },
  { id: 'restaurants', name: 'Restaurants', icon: <Utensils size={32} />, color: 'text-orange-600 bg-orange-50' },
];

const HEALTH_CATEGORIES = [
  { id: 'all', name: 'All Healthcare', icon: <Cross size={32} />, color: 'text-red-600 bg-red-50' },
  { id: 'pharmacy', name: 'Pharmacies', icon: <Pill size={32} />, color: 'text-blue-600 bg-blue-50' },
  { id: 'clinics', name: 'General Clinics', icon: <Stethoscope size={32} />, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'orthopedics', name: 'Orthopedics', icon: <Activity size={32} />, color: 'text-purple-600 bg-purple-50' },
  { id: 'optics', name: 'Optical Stores', icon: <Eye size={32} />, color: 'text-orange-600 bg-orange-50' },
  { id: 'hospitals', name: 'Hospitals', icon: <Hospital size={32} />, color: 'text-indigo-600 bg-indigo-50' },
];

// ==========================================================
// 2. REUSABLE COMPONENTS
// ==========================================================

const Navbar = () => (
  <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
        <MapPin className="text-red-600" fill="currentColor" size={28} />
        LocalConnect
      </Link>
      <div className="hidden md:flex gap-6 text-gray-600 font-medium items-center">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <Link to="/healthcare" className="flex items-center gap-1 text-red-600 font-bold bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors">
           <Cross size={18} /> Health Portal
        </Link>
        <Link to="/login" className="ml-4 bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 shadow-sm hover:shadow transition-all">
          Login
        </Link>
      </div>
    </div>
  </nav>
);

const ShopCard = ({ shop }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-3 group">
    <div className="aspect-[4/3] w-full bg-gray-100 rounded-xl overflow-hidden mb-1">
      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors line-clamp-1">{shop.name}</h3>
      <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm flex-shrink-0 ${shop.status === '🟢 Open' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>{shop.status}</span>
    </div>
    <div className="flex flex-col gap-2 text-sm text-gray-600">
      <span className="flex items-center gap-2"><MapPin size={16} className="text-red-500"/> {shop.locality}</span>
      <span className="flex items-center gap-2"><Phone size={16} className="text-blue-500"/> {shop.phone}</span>
      <span className="flex items-center gap-2"><Clock size={16} className="text-orange-500"/> {shop.openingTime} - {shop.closingTime}</span>
    </div>
    {/* UPDATED: Navigates to local details page instead of external URL */}
    <Link to={`/shop/${shop.id}`} className="mt-2 w-full py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-center text-sm flex items-center justify-center gap-2">
      <Info size={16} /> View Details
    </Link>
  </div>
);

// ==========================================================
// 3. PAGE COMPONENTS
// ==========================================================

// --- NEW: SHOP DETAILS PAGE ---
const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = MOCK_SHOPS_DATA.find(s => s.id === parseInt(id));

  if (!shop) {
    return <div className="p-20 text-center text-2xl font-bold">Shop not found!</div>;
  }

  // Mock days array for the Hours section
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-gray-900 w-full h-64 md:h-80 relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
        
        <div className="absolute z-20 bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <div className="max-w-6xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors">
              <ArrowLeft size={16} /> Back to results
            </button>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{shop.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90 font-medium">
                  <div className="flex items-center gap-1 bg-yellow-500 text-gray-900 px-2 py-0.5 rounded text-sm font-bold">
                    {shop.rating} <Star size={14} fill="currentColor" />
                  </div>
                  <span>({shop.reviews} reviews)</span>
                  <span className="text-white/50">•</span>
                  <span className="capitalize">{shop.category}</span>
                  <span className="text-white/50">•</span>
                  <span>{shop.locality}</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full border shadow-sm ${shop.status === '🟢 Open' ? 'border-emerald-400/30 bg-emerald-500/20 text-emerald-400' : 'border-gray-400/30 bg-gray-500/20 text-gray-300'}`}>
                  {shop.status}
                </span>
                <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                   {shop.openingTime} - {shop.closingTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* About the Business */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">About the Business</h2>
            <p className="text-gray-700 leading-relaxed">{shop.about}</p>
          </section>

          {/* Items / Menu */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Available Here</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shop.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-100">
                  <CheckCircle size={14} className="text-red-500" /> {item}
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Reviews Mockup */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Recommended Reviews</h2>
             <div className="flex flex-col gap-6">
               <div className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">A</div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm">Anonymous User</p>
                     <div className="flex text-yellow-400">
                       <Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12}/>
                     </div>
                   </div>
                 </div>
                 <p className="text-gray-600 text-sm">"Great place! I visit {shop.locality} often and always stop by here. Highly recommended."</p>
               </div>
             </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-8">
          
          {/* Location & Hours */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Location & Hours</h2>
            <div className="flex items-start gap-3 mb-6 bg-red-50 p-4 rounded-xl border border-red-100">
              <MapPin className="text-red-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="font-bold text-gray-900">{shop.name}</p>
                <p className="text-gray-600 text-sm">{shop.locality}</p>
                <p className="text-gray-500 text-xs mt-1">Get directions</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              {days.map((day) => (
                <div key={day} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="font-medium text-gray-700 w-12">{day}</span>
                  <span className="text-gray-600">{shop.openingTime} - {shop.closingTime}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Amenities */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Contact & Details</h2>
            
            <div className="flex flex-col gap-4 mb-6">
               <div className="flex items-center gap-3 text-gray-700 font-medium">
                 <Phone className="text-blue-500" size={18} /> {shop.phone}
               </div>
            </div>

            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Amenities and More</h3>
            <ul className="flex flex-col gap-2">
              {shop.amenities.map((amenity, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-emerald-500" /> {amenity}
                </li>
              ))}
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
};


// --- LOGIN PAGE ---
const Login = () => {
  return (
    <div className="animate-fade-in min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4 border border-red-100 shadow-sm">
            <MapPin size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 font-medium">Log in to manage your local business</p>
        </div>
        
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="admin@localconnect.com" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white" 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white" 
            />
          </div>

          <button 
            type="button" 
            onClick={(e) => e.preventDefault()}
            className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md mt-4 text-lg"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 font-medium">
            Don't have an account? <a href="#" className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors">Sign up as an Admin</a>
          </p>
        </div>

      </div>
    </div>
  );
};

// --- HOME PAGE ---
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const featuredShops = MOCK_SHOPS_DATA.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="animate-fade-in">
      <div className="bg-red-700 py-16 px-4 text-center text-white mb-12 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Support Local Businesses</h1>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Discover groceries, fashion, healthcare, and services right in your locality.
          </p>
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-full">
            <input 
              type="text" 
              placeholder="Search for a shop, service, or locality..." 
              className="w-full py-4 pl-14 pr-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-400/50 transition-all text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-red-600" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.id === 'healthcare' ? '/healthcare' : `/category/${cat.id}`} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 border border-gray-100 hover:border-red-200 group cursor-pointer">
              <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 group-hover:bg-red-50 group-hover:text-red-600 transition-all duration-300`}>{cat.icon}</div>
              <div className="text-center">
                <span className="font-bold text-gray-800 block">{cat.name}</span>
                <span className="text-xs text-gray-500 mt-1 block group-hover:text-red-500 transition-colors">View shops</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Shops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredShops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- HEALTHCARE PORTAL PAGE ---
const HealthcarePortal = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredShops = activeCategory === 'all' ? MOCK_SHOPS_DATA.filter(shop => shop.category === 'healthcare') : MOCK_SHOPS_DATA.filter(shop => shop.category === 'healthcare' && shop.subCategory === activeCategory);

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-16">
      <div className="bg-red-700 py-12 px-4 text-center text-white mb-10 shadow-md border-b border-red-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-3"><Cross size={40} className="text-white" /> Dedicated Health Portal</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto font-medium">Find trusted pharmacies, clinics, specialists, and hospitals near you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Health Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {HEALTH_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 border outline-none ${activeCategory === cat.id ? 'border-red-500 ring-4 ring-red-100 scale-105 shadow-xl' : 'border-gray-100 hover:border-red-200'}`}>
              <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-all duration-300`}>{cat.icon}</div>
              <span className="font-bold text-gray-900 text-sm text-center">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-between border-b border-gray-100 pb-5">
            {HEALTH_CATEGORIES.find(c => c.id === activeCategory)?.name} Listings
            <span className="text-sm font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">{filteredShops.length} Results</span>
          </h2>

          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredShops.map(shop => (
                <div key={shop.id} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-inner flex-shrink-0">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col gap-2">
                      <div className="flex justify-between items-center gap-3">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-700 transition-colors line-clamp-1">{shop.name}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm flex-shrink-0 ${shop.status === '🟢 Open' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>{shop.status}</span>
                      </div>
                      <span className="flex items-center gap-2 text-sm text-gray-600 font-medium"><MapPin size={16} className="text-red-500"/> {shop.locality}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 px-3 py-2 rounded-lg flex-1">📞 {shop.phone}</span>
                    <span className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 px-3 py-2 rounded-lg flex-1"><Clock size={16} className="text-orange-500"/> {shop.openingTime} - {shop.closingTime}</span>
                  </div>
                  <Link to={`/shop/${shop.id}`} className="mt-2 w-full py-3 bg-white border-2 border-red-200 text-red-700 font-bold rounded-xl hover:bg-red-50 transition-colors text-center text-md flex items-center justify-center gap-2"><Info size={18} /> View Details</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="bg-gray-100 p-8 rounded-full mb-6 border border-gray-200 shadow-inner"><Search size={64} className="text-gray-400" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No facilities found</h3>
              <p className="text-gray-600 text-lg max-w-md font-medium">We couldn't find any listings for <strong>{HEALTH_CATEGORIES.find(c => c.id === activeCategory)?.name}</strong> yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- GENERAL CATEGORY PAGE ---
const CategoryPage = () => {
  const { id } = useParams();
  const categoryName = CATEGORIES.find(c => c.id === id)?.name;
  const filteredShops = MOCK_SHOPS_DATA.filter(shop => shop.category === id);

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{categoryName} Shops</h1>
        <p className="text-gray-600 text-lg font-medium mb-10 border-b border-gray-200 pb-4">Browse all available {categoryName?.toLowerCase()} businesses in your locality.</p>

        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="bg-gray-100 p-8 rounded-full mb-6 border border-gray-200 shadow-inner"><Search size={64} className="text-gray-400" /></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No shops found</h3>
            <p className="text-gray-600 text-lg max-w-md font-medium">We couldn't find any listings for <strong>{categoryName}</strong> in your locality yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP: ROUTING LAYER ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50/50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/healthcare" element={<HealthcarePortal />} /> 
            <Route path="/shop/:id" element={<ShopDetails />} />
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}