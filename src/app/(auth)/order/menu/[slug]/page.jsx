 'use client';
import { useState, useEffect, useRef } from 'react';
import useProtectedRoute from "../../../../../components/hook/useProtectedRoute";
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

// Confetti Component
const ConfettiExplosion = ({ x, y, onComplete }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    const colors = ['#f97316', '#ea580c', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 3 + Math.random() * 3;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 4,
        life: 1,
        decay: 0.015 + Math.random() * 0.01
      });
    }
    
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allDead = true;
      particles.forEach(p => {
        if (p.life > 0) {
          allDead = false;
          
          // Update position
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15; // gravity
          p.rotation += p.rotationSpeed;
          p.life -= p.decay;
          
          // Draw particle
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          
          // Draw as a rectangle for confetti effect
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });
      
      if (allDead) {
        cancelAnimationFrame(animationId);
        onComplete();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [x, y, onComplete]);
  
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ top: 0, left: 0 }}
    />
  );
};

// Helper function to generate a unique cart key for the stall
const getCartKey = (stallName) => `cart_${stallName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

export default function MenuPage() {
  const { slug } = useMockParams();
  const router = useMockRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState({}); // State for the current stall's cart
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState([]);
  const [showBackWarning, setShowBackWarning] = useState(false); // State for back warning popup
  const cartInitializedRef = useRef(false); // Ref to track if cart was loaded once

  useEffect(() => {
    if (!slug) return;

    async function fetchRestaurantData() {
      try {
        setLoading(true);
        const response = await fetch('/restaurants.json');
        if (!response.ok) {
          console.error('Fetch error:', response.status, response.statusText);
          throw new Error('Failed to fetch restaurant data');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        const foundRestaurant = data.restaurants.find(r => {
          const restaurantSlug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          console.log('Comparing:', restaurantSlug, 'with', slug);
          return restaurantSlug === slug;
        });

        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
          // Load cart specific to this restaurant
          const cartKey = getCartKey(foundRestaurant.name);
          const savedCart = localStorage.getItem(cartKey);
          if (savedCart) {
            setCart(JSON.parse(savedCart));
            cartInitializedRef.current = true; // Mark as initialized
          } else {
            setCart({}); // Ensure state starts empty if no saved cart
            cartInitializedRef.current = true;
          }
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

  // Update localStorage whenever cart state changes
  useEffect(() => {
    if (restaurant && cartInitializedRef.current) { // Only update after initial load
      const cartKey = getCartKey(restaurant.name);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, restaurant]);

  const addToCart = (item, event) => {
    if (!restaurant) return; // Safety check
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setConfettiPositions(prev => [...prev, { x, y, id: Date.now() }]);
    
    setCart(prev => ({
      ...prev,
      [item.item]: { count: (prev[item.item]?.count || 0) + 1, price: item.price }
    }));
  };
  
  const removeConfetti = (id) => {
    setConfettiPositions(prev => prev.filter(c => c.id !== id));
  };

  const removeFromCart = (itemName) => {
    setCart(prev => {
      if (!prev[itemName]) {
        return prev;
      }
      
      const currentCount = prev[itemName].count;
      
      if (currentCount <= 1) {
        const newCart = { ...prev };
        delete newCart[itemName];
        return newCart;
      } else {
        return {
          ...prev,
          [itemName]: {
            ...prev[itemName],
            count: currentCount - 1
          }
        };
      }
    });
  };

  const getCartSummary = () => {
      const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
      const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.count * item.price), 0);
      return { totalItems, totalPrice };
  }

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  // Handle back navigation warning
  const handleBackClick = () => {
    if (getCartSummary().totalItems > 0) {
      setShowBackWarning(true);
    } else {
      router.back();
    }
  };

  const confirmBack = () => {
    setShowBackWarning(false);
    // Optionally clear the current stall's cart here if discarding
    // const cartKey = getCartKey(restaurant.name);
    // localStorage.removeItem(cartKey);
    // setCart({});
    router.back();
  };

  const cancelBack = () => {
    setShowBackWarning(false);
  };

  // Handle global popstate event (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = (event) => {
      if (getCartSummary().totalItems > 0) {
        event.preventDefault(); // Prevent default navigation
        setShowBackWarning(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [cart]); // Depend on cart to re-evaluate when it changes


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-t-4 border-orange-500 rounded-full animate-spin"></div>
          <p className="mt-6 font-medium text-gray-600">Loading Menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-3xl">
              <div className="mb-6 text-6xl">🔍</div>
              <h2 className="mb-3 text-2xl font-bold text-gray-800">{error || 'Restaurant not found'}</h2>
              <p className="mb-8 text-gray-600">We couldn't find the menu you're looking for.</p>
              <button 
                onClick={handleBackClick} // Use handleBackClick instead of router.back
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
      <div className="min-h-screen pb-32 font-sans bg-gradient-to-b from-amber-50 to-orange-50">
        <header className="relative h-56 overflow-hidden">
          <img src={restaurant.image_url || '  https://placehold.co/1200x400/F97316/FFFFFF?text=Delicious+Food'} alt={restaurant.name} className="object-cover object-center w-full h-full"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute z-10 top-6 left-4">
              <button onClick={handleBackClick} className="p-3 transition-all rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"> {/* Use handleBackClick */}
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
          </div>
          <div className="absolute z-10 text-white bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{restaurant.name}</h1>
            <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="mr-1 text-lg text-yellow-400">★</span>
                  <span className="font-semibold">4.5</span>
                </div>
                <div className="flex items-center">
                   <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>30-40 mins</span>
                </div>
            </div>
          </div>
        </header>

        <nav className="sticky top-0 z-10 bg-white shadow-md shadow-orange-100/50">
          <div className="flex gap-3 p-3 overflow-x-auto scrollbar-hide">
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

        <main className="px-4 py-6">
            {categoryItems.map((items, index) => (
                <div key={index} className={`${activeCategory === index ? 'block' : 'hidden'}`}>
                    <h2 className="pb-2 mb-5 text-xl font-bold text-gray-800 border-b border-gray-200">{categories[index]}</h2>
                    <div className="space-y-5">
                        {items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex gap-5 p-4 bg-white border border-gray-100 shadow-md opacity-0 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${itemIndex * 50}ms`}}>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-gray-800">{item.item}</h3>
                                    <p className="mt-1 mb-2 text-sm text-gray-500">A delicious and savory item.</p>
                                    <p className="text-lg font-bold text-orange-600">₹{item.price > 0 ? item.price : 'N/A'}</p>
                                </div>
                                <div className="flex flex-col items-center justify-between flex-shrink-0">
                                    <div className="relative overflow-hidden bg-gray-100 shadow-inner w-28 h-28 rounded-xl">
                                        <img src={item.image_url || '  https://placehold.co/300x300/FDE68A/F97316?text=Item'} alt={item.item} className="object-cover object-center w-full h-full" onError={(e) => { e.target.onerror = null; e.target.src = '  https://placehold.co/300x300/FDE68A/F97316?text=Item'; }}/>
                                    </div>
                                    {cart[item.item] ? (
                                        <div className="z-10 flex items-center -mt-4 text-sm text-white rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-orange-600">
                                            <button onClick={() => removeFromCart(item.item)} className="flex items-center justify-center w-10 h-10 font-bold transition-colors rounded-l-lg hover:bg-orange-700">−</button>
                                            <span className="w-10 font-bold text-center">{cart[item.item].count}</span>
                                            <button onClick={(e) => addToCart(item, e)} className="flex items-center justify-center w-10 h-10 font-bold transition-colors rounded-r-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={(e) => addToCart(item, e)} className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md -mt-4 z-10 transform hover:scale-105">
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

        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-5 pointer-events-auto animate-cart-pop-in">
            <div className="flex items-center justify-between max-w-md p-4 mx-auto text-white shadow-2xl bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl">
              <div>
                <p className="text-sm font-medium">{totalItems} {totalItems > 1 ? 'items' : 'item'}</p>
                <p className="text-xl font-bold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <button 
                onClick={openCartModal}
                className="flex items-center gap-2 py-3 font-bold text-orange-600 transition-all transform bg-white shadow-lg px-7 rounded-xl hover:bg-amber-50 hover:scale-105"
              >
                <span>View Cart</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {isCartModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                <button
                  onClick={closeCartModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                {Object.keys(cart).length === 0 ? (
                  <p className="py-8 text-center text-gray-500">Your cart is empty</p>
                ) : (
                  <ul className="space-y-4">
                    {Object.entries(cart).map(([itemName, details]) => (
                      <li key={itemName} className="flex items-center justify-between pb-3 border-b">
                        <div>
                          <h4 className="font-medium text-gray-800">{itemName}</h4>
                          <p className="text-sm text-gray-500">Qty: {details.count} × ₹{details.price}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-orange-600">₹{details.count * details.price}</span>
                          <button
                            onClick={() => removeFromCart(itemName)}
                            className="ml-4 text-red-500 hover:text-red-700"
                            aria-label={`Remove ${itemName} from cart`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                <div className="flex justify-between mb-4 text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <button
  onClick={() => {
    const orderSummary = {
      items: Object.entries(cart).map(([name, details]) => ({
        name,
        count: details.count,
        price: details.price,
      })),
      totalPrice,
      status: 'Confirmed', // initial status
      timestamp: Date.now(),
      stallName: restaurant.name // Add stall name to order summary
    };

    // Save to localStorage for My Orders page (append to existing)
    const existingOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    localStorage.setItem('allOrders', JSON.stringify([orderSummary, ...existingOrders]));

    // Save latest order for confirmation page
    sessionStorage.setItem('latestOrder', JSON.stringify(orderSummary));

    // Clear the current stall's cart after order confirmation
    const cartKey = getCartKey(restaurant.name);
    localStorage.removeItem(cartKey);
    setCart({}); // Also clear state

    // Navigate to order confirmation
    window.location.href = '/order-confirmation';
  }}
  className="w-full py-3 font-bold text-white transition-all shadow-md bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 rounded-xl"
>
  Proceed to Checkout
</button>

              </div>
            </div>
          </div>
        )}
        
        {confettiPositions.map(pos => (
          <ConfettiExplosion
            key={pos.id}
            x={pos.x}
            y={pos.y}
            onComplete={() => removeConfetti(pos.id)}
          />
        ))}

        {/* Back Warning Popup */}
        {showBackWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
              <h3 className="mb-2 text-xl font-bold text-gray-800">Unfinished Order</h3>
              <p className="mb-6 text-gray-600">
                You have items in your cart for {restaurant.name}. Do you want to place the order or discard it?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmBack}
                  className="px-6 py-3 font-semibold text-white transition-all shadow-md bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-xl"
                >
                  Place Order
                </button>
                <button
                  onClick={cancelBack}
                  className="px-6 py-3 font-semibold text-white transition-all shadow-md bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-xl"
                >
                  Discard Order
                </button>
                <button
                  onClick={cancelBack}
                  className="px-6 py-3 font-semibold text-gray-500 transition-colors hover:text-gray-700 rounded-xl"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}