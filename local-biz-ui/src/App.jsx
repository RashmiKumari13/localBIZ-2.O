import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Shirt, Cross, Wrench, Utensils, MapPin, Pill, Stethoscope, Hospital, Activity, Eye, Phone, Clock, Globe, ArrowLeft, Star, CheckCircle, Info, ChevronRight } from 'lucide-react';

//==========================================================
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
  { id: 'grocery', name: 'Grocery', icon: <ShoppingBag size={28} /> },
  { id: 'fashion', name: 'Fashion', icon: <Shirt size={28} /> },
  { id: 'healthcare', name: 'Healthcare', icon: <Cross size={28} /> },
  { id: 'services', name: 'Services', icon: <Wrench size={28} /> },
  { id: 'restaurants', name: 'Restaurants', icon: <Utensils size={28} /> },
];

const HEALTH_CATEGORIES = [
  { id: 'all', name: 'All Healthcare', icon: <Cross size={28} /> },
  { id: 'pharmacy', name: 'Pharmacies', icon: <Pill size={28} /> },
  { id: 'clinics', name: 'General Clinics', icon: <Stethoscope size={28} /> },
  { id: 'orthopedics', name: 'Orthopedics', icon: <Activity size={28} /> },
  { id: 'optics', name: 'Optical Stores', icon: <Eye size={28} /> },
  { id: 'hospitals', name: 'Hospitals', icon: <Hospital size={28} /> },
];

// ==========================================================
// 2. REUSABLE COMPONENTS
// ==========================================================

const Navbar = () => (
  <nav className="bg-[#fff9ec]/90 backdrop-blur-md border-b border-[#ffdccc] p-4 sticky top-0 z-50 transition-all">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
      <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 group text-[#5d2a42]">
        <div className="bg-[#fb6376] p-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-all">
          <MapPin className="text-[#fff9ec]" fill="currentColor" size={24} />
        </div>
        <span>LocalBIZ</span>
      </Link>
      <div className="hidden md:flex gap-8 text-[#5d2a42] font-semibold items-center">
        <Link to="/" className="hover:text-[#fb6376] transition-colors">Home</Link>
        <Link to="/healthcare" className="flex items-center gap-1.5 text-[#fb6376] hover:bg-[#ffdccc] px-4 py-2 rounded-full transition-all">
           <Cross size={18} /> Health Portal
        </Link>
        <Link to="/login" className="ml-2 bg-[#5d2a42] text-[#fff9ec] px-6 py-2.5 rounded-full font-bold hover:bg-[#fb6376] shadow-md hover:shadow-lg transition-all duration-300">
          Login
        </Link>
      </div>
    </div>
  </nav>
);

const ShopCard = ({ shop }) => (
  <div className="bg-[#fff9ec] p-4 rounded-3xl border border-[#ffdccc] shadow-sm hover:shadow-xl hover:border-[#fb6376] transition-all duration-300 flex flex-col gap-4 group">
    <div className="aspect-[4/3] w-full bg-[#ffdccc] rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#5d2a42]/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
      <span className={`absolute top-3 left-3 z-20 text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${shop.status === '🟢 Open' ? 'bg-[#fcb1a6] text-[#5d2a42]' : 'bg-[#fff9ec] text-[#5d2a42]'}`}>
        {shop.status}
      </span>
    </div>
    
    <div className="flex flex-col gap-1 px-1">
      <div className="flex justify-between items-start">
        <h3 className="font-extrabold text-lg text-[#5d2a42] group-hover:text-[#fb6376] transition-colors line-clamp-1">{shop.name}</h3>
        <div className="flex items-center gap-1 text-sm font-bold text-[#5d2a42] bg-[#ffdccc] px-2 py-0.5 rounded-lg">
          {shop.rating} <Star size={12} className="text-[#fb6376]" fill="currentColor" />
        </div>
      </div>
      <p className="text-sm text-[#5d2a42]/70 line-clamp-1">{shop.about}</p>
    </div>

    <div className="flex flex-col gap-2 text-sm text-[#5d2a42]/80 px-1 mt-auto font-medium">
      <span className="flex items-center gap-2"><MapPin size={16} className="text-[#fb6376]"/> {shop.locality}</span>
      <span className="flex items-center gap-2"><Clock size={16} className="text-[#fcb1a6]"/> {shop.openingTime} - {shop.closingTime}</span>
    </div>
    
    <Link to={`/shop/${shop.id}`} className="mt-2 w-full py-3 bg-[#ffdccc] text-[#5d2a42] font-bold rounded-xl group-hover:bg-[#fb6376] group-hover:text-[#fff9ec] transition-all duration-300 text-center text-sm flex items-center justify-center gap-2">
      View Details <ChevronRight size={16} />
    </Link>
  </div>
);

// ==========================================================
// 3. PAGE COMPONENTS
// ==========================================================

// --- SHOP DETAILS PAGE ---
const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = MOCK_SHOPS_DATA.find(s => s.id === parseInt(id));

  if (!shop) {
    return <div className="p-20 text-center text-2xl font-bold text-[#5d2a42]">Shop not found!</div>;
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="animate-fade-in bg-[#fff9ec] min-h-screen pb-16">
      {/* Hero Section */}
      <div className="w-full h-[400px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5d2a42]/60 via-[#5d2a42]/80 to-[#5d2a42] z-10"></div>
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
        
        <div className="absolute z-20 bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#ffdccc] hover:text-[#fff9ec] mb-6 text-sm font-semibold transition-colors bg-[#fff9ec]/10 backdrop-blur-md px-4 py-2 rounded-full w-max border border-[#fff9ec]/20">
              <ArrowLeft size={16} /> Back to results
            </button>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#fff9ec]/20 backdrop-blur-md border border-[#fff9ec]/30 text-[#fff9ec] text-xs font-bold rounded-full uppercase tracking-wider">
                    {shop.category}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${shop.status === '🟢 Open' ? 'bg-[#fcb1a6] text-[#5d2a42]' : 'bg-[#fff9ec] text-[#5d2a42]'}`}>
                    {shop.status}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#fff9ec] mb-4 tracking-tight drop-shadow-lg">{shop.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-[#fff9ec]/90 font-medium">
                  <div className="flex items-center gap-1.5 bg-[#fb6376] text-[#fff9ec] px-3 py-1 rounded-lg text-sm font-bold shadow-md">
                    {shop.rating} <Star size={16} fill="currentColor" />
                  </div>
                  <span className="underline decoration-[#fcb1a6] underline-offset-4">{shop.reviews} verified reviews</span>
                  <span className="text-[#fcb1a6]">•</span>
                  <span className="flex items-center gap-1.5"><MapPin size={18} className="text-[#fb6376]"/> {shop.locality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#ffdccc]">
            <h2 className="text-2xl font-extrabold text-[#5d2a42] mb-5 flex items-center gap-2">
              <Info className="text-[#fb6376]" /> About the Business
            </h2>
            <p className="text-[#5d2a42]/80 text-lg leading-relaxed">{shop.about}</p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#ffdccc]">
            <h2 className="text-2xl font-extrabold text-[#5d2a42] mb-6 flex items-center gap-2">
              <ShoppingBag className="text-[#fb6376]" /> Available Here
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shop.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#fff9ec] px-4 py-3 rounded-xl text-sm font-semibold text-[#5d2a42] border border-[#ffdccc] hover:border-[#fcb1a6] transition-colors">
                  <CheckCircle size={18} className="text-[#fb6376]" /> {item}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#ffdccc]">
             <h2 className="text-2xl font-extrabold text-[#5d2a42] mb-6 flex items-center gap-2">
               <Star className="text-[#fb6376]" /> Recommended Reviews
             </h2>
             <div className="flex flex-col gap-6">
               <div className="bg-[#fff9ec] p-6 rounded-2xl border border-[#ffdccc]">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 bg-[#fb6376] rounded-full flex items-center justify-center font-bold text-[#fff9ec] text-lg shadow-inner">A</div>
                   <div>
                     <p className="font-bold text-[#5d2a42]">Anonymous User</p>
                     <div className="flex text-[#fb6376] mt-1">
                       <Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14}/>
                     </div>
                   </div>
                 </div>
                 <p className="text-[#5d2a42]/80 italic">"An absolutely great place! I visit {shop.locality} often and always make sure to stop by here. Highly recommended for the quality and service."</p>
               </div>
             </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#ffdccc]">
            <h2 className="text-xl font-extrabold text-[#5d2a42] mb-6 border-b border-[#ffdccc] pb-4">Location & Hours</h2>
            
            <div className="flex items-start gap-4 mb-8 bg-[#fff9ec] p-5 rounded-2xl border border-[#fcb1a6]">
              <div className="bg-[#ffdccc] p-2 rounded-full shadow-sm">
                <MapPin className="text-[#fb6376]" size={24} />
              </div>
              <div>
                <p className="font-bold text-[#5d2a42] text-lg">{shop.name}</p>
                <p className="text-[#5d2a42]/80">{shop.locality}</p>
                <p className="text-[#fb6376] font-bold text-sm mt-2 hover:underline cursor-pointer">Get directions</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {days.map((day) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-[#fff9ec] last:border-0">
                  <span className="font-bold text-[#5d2a42]/60 w-12">{day}</span>
                  <span className="text-[#5d2a42] font-bold bg-[#fff9ec] px-3 py-1 rounded-md">{shop.openingTime} - {shop.closingTime}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#ffdccc]">
            <h2 className="text-xl font-extrabold text-[#5d2a42] mb-6 border-b border-[#ffdccc] pb-4">Contact & Details</h2>
            <div className="flex flex-col gap-4 mb-8">
               <div className="flex items-center gap-4 text-[#5d2a42] font-bold text-lg bg-[#fff9ec] p-4 rounded-2xl border border-[#ffdccc]">
                 <div className="bg-white p-2 rounded-full shadow-sm">
                   <Phone className="text-[#fb6376]" size={20} /> 
                 </div>
                 {shop.phone}
               </div>
            </div>

            <h3 className="text-xs font-extrabold text-[#5d2a42]/50 mb-4 uppercase tracking-widest">Amenities and More</h3>
            <ul className="flex flex-col gap-3">
              {shop.amenities.map((amenity, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-medium text-[#5d2a42]/80">
                  <div className="bg-[#ffdccc] p-1 rounded-full"><CheckCircle size={16} className="text-[#fb6376]" /></div> {amenity}
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
    <div className="animate-fade-in min-h-[85vh] flex items-center justify-center bg-[#fff9ec] px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#fcb1a6]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#ffdccc]/50 rounded-full blur-3xl"></div>

      <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-2xl shadow-[#5d2a42]/5 border border-[#ffdccc] w-full max-w-md relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#5d2a42] text-[#fff9ec] mb-6 shadow-lg shadow-[#5d2a42]/30 transform rotate-3">
            <MapPin size={40} className="-rotate-3" />
          </div>
          <h2 className="text-3xl font-black text-[#5d2a42] tracking-tight">Welcome Back</h2>
          <p className="text-[#5d2a42]/60 mt-3 font-medium">Log in to manage your local business</p>
        </div>
        
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-[#5d2a42] mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="admin@localconnect.com" 
              className="w-full px-5 py-4 rounded-xl border border-[#ffdccc] focus:outline-none focus:ring-4 focus:ring-[#fcb1a6]/50 focus:border-[#fb6376] transition-all bg-[#fff9ec] text-[#5d2a42] placeholder-[#5d2a42]/40 font-medium" 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-[#5d2a42]">Password</label>
              <a href="#" className="text-sm font-bold text-[#fb6376] hover:text-[#5d2a42] transition-colors">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-4 rounded-xl border border-[#ffdccc] focus:outline-none focus:ring-4 focus:ring-[#fcb1a6]/50 focus:border-[#fb6376] transition-all bg-[#fff9ec] text-[#5d2a42] placeholder-[#5d2a42]/40 font-medium" 
            />
          </div>

          <button 
            type="button" 
            onClick={(e) => e.preventDefault()}
            className="w-full py-4 mt-4 bg-[#fb6376] text-[#fff9ec] font-bold rounded-xl hover:bg-[#5d2a42] shadow-lg shadow-[#fb6376]/30 transition-all transform hover:-translate-y-0.5 text-lg"
          >
            Log In
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-[#ffdccc] text-center">
          <p className="text-[#5d2a42]/60 font-medium">
            Don't have an account? <a href="#" className="text-[#fb6376] font-bold hover:text-[#5d2a42] hover:underline transition-colors ml-1">Sign up as Admin</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- HOME PAGE ---
// --- HOME PAGE (Updated Hero) ---
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const featuredShops = MOCK_SHOPS_DATA.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="animate-fade-in bg-[#fff9ec] min-h-screen">
      {/* Clean Background Image Hero */}
      <div className="relative py-32 px-4 text-center text-[#fff9ec] shadow-xl overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image - Now fully visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/shops/hero-bg3.jpg')" }}
        ></div>
        
        {/* Subtle Dark Overlay (Only to make text readable, no blur) */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
    
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl leading-tight text-white">
            Support Local <br className="hidden md:block"/> Businesses
          </h1>
          <p className="text-white text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Discover groceries, top-rated fashion, elite healthcare, and premium services right in your locality.
          </p>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-3xl mx-auto shadow-2xl rounded-2xl group">
            <div className="relative flex items-center bg-white rounded-2xl p-2">
              <Search className="text-[#fb6376] ml-4 mr-2" size={28} />
              <input 
                type="text" 
                placeholder="Search for a shop, service, or locality..." 
                className="w-full py-4 px-2 bg-transparent text-[#5d2a42] placeholder-[#5d2a42]/40 focus:outline-none text-lg font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="hidden md:block bg-[#5d2a42] text-[#fff9ec] px-8 py-3 rounded-xl font-bold hover:bg-[#fb6376] transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ... rest of your categories and featured shops code ... */}

      <div className="max-w-7xl mx-auto px-4 mb-16 mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#5d2a42] tracking-tight">Browse by Category</h2>
            <p className="text-[#5d2a42]/60 font-medium mt-2 text-lg">Find exactly what you're looking for.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.id === 'healthcare' ? '/healthcare' : `/category/${cat.id}`} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-5 border border-[#ffdccc] hover:border-[#fb6376] hover:-translate-y-1 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ffdccc]/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className={`p-5 rounded-2xl ring-1 ring-[#fcb1a6] text-[#fb6376] bg-[#ffdccc] group-hover:bg-[#fb6376] group-hover:text-[#fff9ec] group-hover:scale-110 transition-all duration-300 shadow-inner z-10`}>
                {cat.icon}
              </div>
              <div className="text-center z-10">
                <span className="font-extrabold text-[#5d2a42] block text-lg">{cat.name}</span>
                <span className="text-sm font-bold text-[#5d2a42]/50 mt-1 block group-hover:text-[#fb6376] transition-colors flex items-center justify-center gap-1">Explore <ChevronRight size={14}/></span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#5d2a42] tracking-tight">Featured Shops</h2>
            <p className="text-[#5d2a42]/60 font-medium mt-2 text-lg">Hand-picked local favorites.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredShops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- HEALTHCARE PORTAL PAGE ---
// --- HEALTHCARE PORTAL PAGE (Updated Header) ---
const HealthcarePortal = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredShops = activeCategory === 'all' ? MOCK_SHOPS_DATA.filter(shop => shop.category === 'healthcare') : MOCK_SHOPS_DATA.filter(shop => shop.category === 'healthcare' && shop.subCategory === activeCategory);

  return (
    <div className="animate-fade-in bg-[#fff9ec] min-h-screen pb-24">
      {/* Health Portal Background Image Header */}
      <div className="relative py-24 px-4 text-center text-white shadow-lg overflow-hidden">
        {/* Background Image xyz.jpg */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/shops/hero-bg4.jpg')" }}
        ></div>
        
        {/* Minimal Overlay for Contrast */}
        <div className="absolute inset-0 bg-[#5d2a42]/40 z-10"></div>

        <div className="max-w-4xl mx-auto relative z-20">
          <div className="inline-flex p-3 bg-[#fb6376] rounded-2xl mb-6 shadow-lg">
            <Cross size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-xl">Dedicated Health Portal</h1>
          <p className="text-white text-xl max-w-2xl mx-auto font-semibold drop-shadow-md">Find trusted pharmacies, leading clinics, and specialist hospitals near you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-[#ffdccc] mb-12 flex overflow-x-auto hide-scrollbar gap-3 snap-x">
          {HEALTH_CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)} 
              className={`snap-center flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#5d2a42] text-[#fff9ec] shadow-md' : 'bg-[#fff9ec] text-[#5d2a42]/70 hover:bg-[#ffdccc] border border-[#ffdccc]'}`}
            >
              <div className={`${activeCategory === cat.id ? 'text-[#fb6376]' : 'text-[#fb6376]'}`}>
                {cat.icon}
              </div>
              <span className="whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="mb-12 flex justify-between items-end">
          <div>
             <h2 className="text-3xl font-black text-[#5d2a42] tracking-tight">{HEALTH_CATEGORIES.find(c => c.id === activeCategory)?.name} Listings</h2>
             <p className="text-[#5d2a42]/60 font-medium mt-2 text-lg">Showing {filteredShops.length} verified results.</p>
          </div>
        </div>

        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredShops.map(shop => (
              <div key={shop.id} className="bg-white p-6 rounded-3xl border border-[#ffdccc] hover:border-[#fb6376] hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 group">
                <div className="w-full sm:w-40 h-40 bg-[#fff9ec] rounded-2xl overflow-hidden shadow-inner flex-shrink-0 relative">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="font-black text-2xl text-[#5d2a42] group-hover:text-[#fb6376] transition-colors line-clamp-1">{shop.name}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm flex-shrink-0 ${shop.status === '🟢 Open' ? 'bg-[#fcb1a6] text-[#5d2a42]' : 'bg-[#ffdccc] text-[#5d2a42]/70'}`}>{shop.status}</span>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-[#5d2a42]/60 font-bold mb-4"><MapPin size={16} className="text-[#fb6376]"/> {shop.locality}</span>
                  </div>
                  
                  <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                    <span className="flex items-center gap-2 text-sm text-[#5d2a42] font-bold bg-[#fff9ec] border border-[#ffdccc] px-4 py-2 rounded-xl">📞 {shop.phone}</span>
                    <Link to={`/shop/${shop.id}`} className="bg-[#5d2a42] text-[#fff9ec] font-bold px-6 py-2 rounded-xl hover:bg-[#fb6376] transition-colors text-center text-sm flex items-center justify-center gap-2 ml-auto shadow-md">
                      View Details <ChevronRight size={16}/>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 bg-white rounded-3xl border border-[#ffdccc] text-center flex flex-col items-center justify-center shadow-sm">
            <div className="bg-[#fff9ec] p-8 rounded-full mb-6 border border-[#ffdccc] shadow-inner">
              <Search size={48} className="text-[#fcb1a6]" />
            </div>
            <h3 className="text-2xl font-black text-[#5d2a42] mb-3 tracking-tight">No facilities found</h3>
            <p className="text-[#5d2a42]/60 text-lg max-w-md font-medium">We couldn't find any listings for <strong>{HEALTH_CATEGORIES.find(c => c.id === activeCategory)?.name}</strong> in your area right now.</p>
          </div>
        )}
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
    <div className="animate-fade-in bg-[#fff9ec] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[#fb6376] font-bold hover:text-[#5d2a42] mb-6 transition-colors"><ArrowLeft size={16}/> Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-black text-[#5d2a42] mb-4 tracking-tight">{categoryName} Shops</h1>
          <p className="text-[#5d2a42]/70 text-xl font-medium max-w-2xl">Browse all available top-rated {categoryName?.toLowerCase()} businesses in your locality.</p>
        </div>

        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="bg-white py-24 rounded-3xl border border-[#ffdccc] text-center flex flex-col items-center justify-center shadow-sm">
            <div className="bg-[#fff9ec] p-8 rounded-full mb-6 border border-[#ffdccc] shadow-inner">
              <Search size={48} className="text-[#fcb1a6]" />
            </div>
            <h3 className="text-2xl font-black text-[#5d2a42] mb-3 tracking-tight">No shops found</h3>
            <p className="text-[#5d2a42]/60 text-lg max-w-md font-medium">We couldn't find any listings for <strong>{categoryName}</strong> in your area right now.</p>
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
      <div className="min-h-screen flex flex-col bg-[#fff9ec] text-[#5d2a42] font-sans selection:bg-[#fb6376] selection:text-[#fff9ec]">
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