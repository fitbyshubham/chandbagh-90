'use client';
import { useState, useEffect, useRef } from 'react';

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
      className="fixed inset-0 pointer-events-none z-50"
      style={{ top: 0, left: 0 }}
    />
  );
};

export default function MenuPage() {
  const { slug } = useMockParams();
  const router = useMockRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState([]);

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

  const addToCart = (item, event) => {
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

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

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
                                        <img src={item.image_url || 'https://placehold.co/300x300/FDE68A/F97316?text=Item'} alt={item.item} className="w-full h-full object-cover object-center" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/FDE68A/F97316?text=Item'; }}/>
                                    </div>
                                    {cart[item.item] ? (
                                        <div className="flex items-center bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-lg -mt-4 z-10 text-sm">
                                            <button onClick={() => removeFromCart(item.item)} className="w-10 h-10 font-bold hover:bg-orange-700 rounded-l-lg transition-colors flex items-center justify-center">−</button>
                                            <span className="font-bold w-10 text-center">{cart[item.item].count}</span>
                                            <button onClick={(e) => addToCart(item, e)} className="w-10 h-10 font-bold bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 rounded-r-lg transition-colors flex items-center justify-center">+</button>
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
          <div className="fixed bottom-0 left-0 right-0 p-5 z-50 animate-cart-pop-in pointer-events-auto">
            <div className="max-w-md mx-auto bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{totalItems} {totalItems > 1 ? 'items' : 'item'}</p>
                <p className="text-xl font-bold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <button 
                onClick={openCartModal}
                className="bg-white text-orange-600 px-7 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all shadow-lg flex items-center gap-2 transform hover:scale-105"
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
              <div className="flex justify-between items-center p-4 border-b">
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
              <div className="overflow-y-auto p-4 flex-grow">
                {Object.keys(cart).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <ul className="space-y-4">
                    {Object.entries(cart).map(([itemName, details]) => (
                      <li key={itemName} className="flex justify-between items-center border-b pb-3">
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
                <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
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
      timestamp: Date.now()
    };

    // Save to localStorage for My Orders page
    const existingOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    localStorage.setItem('allOrders', JSON.stringify([orderSummary, ...existingOrders]));

    // Save latest order for confirmation page
    sessionStorage.setItem('latestOrder', JSON.stringify(orderSummary));

    // Navigate to order confirmation
    window.location.href = '/order-confirmation';
  }}
  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-md"
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
      </div>
    </>
  );
}