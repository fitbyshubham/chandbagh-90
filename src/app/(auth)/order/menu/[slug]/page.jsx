'use client';

import { useState, useEffect } from 'react';

// This is a mock hook to simulate Next.js functionality in this environment.
const useMockRouter = () => ({
    back: () => window.history.back(),
});

// This is a mock hook to simulate Next.js functionality in this environment.
const useMockParams = () => {
    const [params, setParams] = useState({ slug: '' });
    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const slug = pathSegments[pathSegments.length - 1];
        setParams({ slug });
    }, []);
    return params;
};

// Mock data structure (in a real app, this would come from the JSON file)
const mockRestaurants = {
    restaurants: [
        {
            id: 1,
            name: "The Spice Route",
            image_url: "https://placehold.co/1200x400/F97316/FFFFFF?text=Spice+Route",
            categories: {
                "Appetizers": [
                    { item: "Samosa", price: 40, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Samosa" },
                    { item: "Paneer Tikka", price: 80, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Paneer" }
                ],
                "Main Course": [
                    { item: "Butter Chicken", price: 250, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Chicken" },
                    { item: "Dal Makhani", price: 180, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Dal" }
                ],
                "Desserts": [
                    { item: "Gulab Jamun", price: 60, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Gulab" },
                    { item: "Rasmalai", price: 70, image_url: "https://placehold.co/300x300/FDE68A/F97316?text=Rasmalai" }
                ]
            }
        }
    ]
};

export default function MenuPage() {
  const { slug } = useMockParams();
  const router = useMockRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (!slug) return; // Don't fetch if slug isn't ready

    async function fetchRestaurantData() {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock data fetch
        const data = mockRestaurants;
        const foundRestaurant = data.restaurants.find(r => {
          const restaurantSlug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return restaurantSlug === slug;
        });
        
        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
        } else {
          setError('Restaurant not found');
        }
      } catch (err) {
        console.error('Error fetching restaurant data:', err);
        setError('Failed to load restaurant data');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantData();
  }, [slug]);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.item]: { count: (prev[item.item]?.count || 0) + 1, price: item.price }
    }));
  };

  const removeFromCart = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName]?.count > 1) {
        newCart[itemName].count--;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  const getCartSummary = () => {
      const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
      const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.count * item.price), 0);
      return { totalItems, totalPrice };
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading Menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{error || 'Restaurant not found'}</h2>
              <p className="text-gray-600 mb-8">We couldn't find the menu you're looking for.</p>
              <button 
                onClick={() => router.back()}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Go Back to Stalls
              </button>
          </div>
      </div>
    );
  }

  const categories = Object.keys(restaurant.categories);
  const categoryItems = Object.values(restaurant.categories);
  const { totalItems, totalPrice } = getCartSummary();

  return (
    <>
      <style jsx global>{`
          @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
              animation: fade-in-up 0.5s ease-out forwards;
          }
           @keyframes cart-pop-in {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          .animate-cart-pop-in {
              animation: cart-pop-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .gradient-text {
            background: linear-gradient(90deg, #f97316, #ea580c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 font-sans pb-32">
        {/* Header Image and Info */}
        <header className="relative h-56 overflow-hidden">
          <img src={restaurant.image_url || 'https://placehold.co/1200x400/F97316/FFFFFF?text=Delicious+Food'} alt={restaurant.name} className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute top-6 left-4 z-10">
              <button onClick={() => router.back()} className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <h1 className="text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{restaurant.name}</h1>
            <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-400 mr-1 text-lg">★</span>
                  <span className="font-semibold">4.5</span>
                </div>
                <div className="flex items-center">
                   <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>30-40 mins</span>
                </div>
            </div>
          </div>
        </header>

        {/* Category Navigation */}
        <nav className="bg-white sticky top-0 z-10 shadow-md shadow-orange-100/50">
          <div className="flex overflow-x-auto p-3 gap-3 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2.5 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === index ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md shadow-orange-300/50' : 'bg-amber-100 text-gray-700 hover:bg-amber-200'}`}
                onClick={() => setActiveCategory(index)}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* Menu Items */}
        <main className="px-4 py-6">
            {categoryItems.map((items, index) => (
                <div key={index} className={`${activeCategory === index ? 'block' : 'hidden'}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200">{categories[index]}</h2>
                    <div className="space-y-5">
                        {items.map((item, itemIndex) => (
                            <div key={itemIndex} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex gap-5 animate-fade-in-up opacity-0" style={{ animationDelay: `${itemIndex * 50}ms`}}>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-800 text-base">{item.item}</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-2">A delicious and savory item.</p>
                                    <p className="text-orange-600 font-bold text-lg">₹{item.price > 0 ? item.price : 'N/A'}</p>
                                </div>
                                <div className="flex flex-col items-center justify-between flex-shrink-0">
                                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 relative shadow-inner">
                                        <img src={item.image_url || '  https://placehold.co/300x300/FDE68A/F97316?text=Item'} alt={item.item} className="w-full h-full object-cover object-center" onError={(e) => { e.target.onerror = null; e.target.src = '  https://placehold.co/300x300/FDE68A/F97316?text=Item'; }}/>
                                    </div>
                                    {cart[item.item] ? (
                                        <div className="flex items-center bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-lg -mt-4 z-10 text-sm">
                                            <button onClick={() => removeFromCart(item.item)} className="w-10 h-10 font-bold hover:bg-orange-700 rounded-l-lg transition-colors flex items-center justify-center">−</button>
                                            <span className="font-bold w-10 text-center">{cart[item.item].count}</span>
                                            <button onClick={() => addToCart(item)} className="w-10 h-10 font-bold bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 rounded-r-lg transition-colors flex items-center justify-center">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addToCart(item)} className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md -mt-4 z-10 transform hover:scale-105">
                                            ADD
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <footer className="fixed bottom-0 left-0 right-0 p-5 z-30 animate-cart-pop-in">
              <div className="max-w-md mx-auto bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
                  <div>
                      <p className="text-sm font-medium">{totalItems} {totalItems > 1 ? 'items' : 'item'}</p>
                      <p className="text-xl font-bold">₹{totalPrice.toFixed(2)}</p>
                  </div>
                  <button className="bg-white text-orange-600 px-7 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors flex items-center gap-2 shadow-lg">
                      <span>View Cart</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12"></path></svg>
                  </button>
              </div>
          </footer>
        )}
      </div>
    </>
  );
}