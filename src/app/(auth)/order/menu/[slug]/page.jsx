// src/app/(auth)/order/menu/[slug]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MenuPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        setLoading(true);
        // Fetch from public folder
        const response = await fetch('/restaurants.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        
        const data = await response.json();
        
        // Find restaurant by slug
        const foundRestaurant = data.restaurants.find(r => {
          const restaurantSlug = r.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
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
      [item.item]: (prev[item.item] || 0) + 1
    }));
  };

  const removeFromCart = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName] > 1) {
        newCart[itemName]--;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || 'Restaurant not found'}
          </h2>
          <p className="text-gray-600 mb-4">We couldn't find the menu for this restaurant</p>
          <button 
            onClick={() => router.back()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const categories = Object.keys(restaurant.categories);
  const categoryItems = Object.values(restaurant.categories);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="p-4 flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">{restaurant.name}</h1>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4 bg-white mb-4 shadow-sm">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden mr-4 flex-shrink-0">
            {restaurant.image_url ? (
              <img 
                src={restaurant.image_url} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                <span className="text-3xl">🍽️</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-lg">{restaurant.name}</h2>
            <div className="flex items-center mt-2">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded-lg mr-3">
                <span className="text-green-600 text-sm mr-1">★</span>
                <span className="text-sm font-bold text-green-700">4.5</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">30-40 mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white sticky top-16 z-10 shadow-sm">
        <div className="flex overflow-x-auto py-3 px-4 gap-3 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all ${
                activeCategory === index
                  ? 'bg-orange-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(index)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4">
        {categoryItems.map((items, index) => (
          <div 
            key={index} 
            className={`${activeCategory === index ? 'block' : 'hidden'}`}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg mr-2">
                {items.length}
              </span>
              {categories[index]}
            </h2>
            <div className="space-y-4">
              {items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.item} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"><span class="text-3xl">🍽️</span></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-3xl">🍽️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1">{item.item}</h3>
                      <p className="text-orange-600 font-bold text-lg mb-3">
                        ₹{item.price > 0 ? item.price : 'N/A'}
                      </p>
                      {cart[item.item] ? (
                        <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-2 inline-flex">
                          <button 
                            onClick={() => removeFromCart(item.item)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 font-bold hover:bg-orange-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="font-bold text-orange-600 w-6 text-center">
                            {cart[item.item]}
                          </span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold hover:bg-orange-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-500 p-4 shadow-lg z-30">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div>
              <p className="text-sm text-gray-600">
                {Object.values(cart).reduce((a, b) => a + b, 0)} items added
              </p>
              <p className="text-lg font-bold text-gray-900">View Cart</p>
            </div>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-md">
              Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}