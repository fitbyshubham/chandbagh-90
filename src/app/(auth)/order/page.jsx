'use client'
import { useState, useEffect } from "react"

// A modern, animated card for displaying restaurant stalls.
const StallsCard = ({ image, name, rating, stallNo, offer, index, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer animate-fade-in-up bg-white rounded-2xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out opacity-0"
            style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'forwards' }}
        >
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/F97316/FFFFFF?text=Food'; }}
                />
                {offer && (
                    <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-md">
                        {offer}
                    </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white/90 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{rating}</span>
                </div>
            </div>
            <div className="p-3">
                <h3 className="font-bold text-gray-800 truncate">{name}</h3>
                <p className="text-sm text-gray-500">Stall No. {stallNo}</p>
            </div>
        </div>
    );
};


// A modern placeholder for popular restaurant cards.
const PopRestaurants = ({ restaurants, onCardClick }) => (
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {restaurants.slice(0, 5).map((resto, index) => (
            <div
                key={resto.stallNo}
                onClick={() => onCardClick(resto.name)}
                className="flex-shrink-0 w-48 group cursor-pointer animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
                <div className="relative rounded-xl overflow-hidden shadow-md">
                    <img src={resto.image} alt={resto.name} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h4 className="font-bold truncate">{resto.name}</h4>
                        <p className="text-xs">{resto.rating} ★ • Stall {resto.stallNo}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);


export default function StallsCardPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = [
        { name: "All", icon: "🍖" },
        { name: "Indian", icon: "🍲" },
        { name: "Chinese", icon: "🥡" },
        { name: "Rolls", icon: "🌯" },
        { name: "Pizza", icon: "🍕" },
        { name: "Burger", icon: "🍔" },
        { name: "Drinks", icon: "🥤" },
        { name: "Dessert", icon: "🍰" },
    ];

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                setLoading(true);
                const response = await fetch('/restaurants.json');
                if (!response.ok) throw new Error('Failed to fetch restaurant data.');

                const data = await response.json();
                const mappedRestaurants = data.restaurants.map((restaurant, index) => ({
                    name: restaurant.name,
                    image: restaurant.image_url || getDefaultImage(restaurant.name),
                    rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1), // Random rating between 3.8 and 5.0
                    stallNo: (index + 1).toString(),
                    offer: getRandomOffer()
                }));
                setRestaurants(mappedRestaurants);
            } catch (err) {
                console.error('Error fetching restaurants:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchRestaurants();
    }, []);
    
    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    const handleCardClick = (restaurantName) => {
        const slug = generateSlug(restaurantName);
        window.location.href = `/order/menu/${slug}`;
    };

    // Helper functions
    function getDefaultImage(name) {
        const images = {
            'rolls': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
            'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
            'cafe': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
            'default': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'
        };
        const lowerName = name.toLowerCase();
        if (lowerName.includes('roll')) return images.rolls;
        if (lowerName.includes('burger')) return images.burger;
        if (lowerName.includes('pizza') || lowerName.includes('domino')) return images.pizza;
        if (lowerName.includes('cafe') || lowerName.includes('café')) return images.cafe;
        return images.default;
    }

    function getRandomOffer() {
        const offers = ['', '20% OFF', '10% OFF', 'Buy 1 Get 1', ''];
        return offers[Math.floor(Math.random() * offers.length)];
    }

    if (loading) return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Finding delicious food...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="text-6xl mb-4">🍽️</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
    );

    return (
        <>
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation-name: fade-in-up;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-out;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="w-full min-h-screen mx-auto bg-gray-50 font-sans">
                <div className="p-4 md:p-6 space-y-6">
                    {/* Top Search Bar */}
                    <div className="flex items-center gap-3 sticky top-0 z-10 bg-gray-50 pt-2 pb-3">
                        <div className="relative flex-1">
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input
                                className="w-full px-4 py-3 pl-12 rounded-full bg-white text-sm outline-none border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                                placeholder="Search stalls, items..."
                            />
                        </div>
                        <button className="bg-white p-3 rounded-full shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                    </div>

                    {/* Categories */}
                    <section>
                        <div className="flex flex-row items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
                            {categories.map((c, index) => (
                                <div
                                    key={c.name}
                                    className="flex flex-col items-center flex-shrink-0 gap-2 cursor-pointer group animate-fade-in-up opacity-0"
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:shadow-md group-hover:scale-105 transition-all">
                                        {c.icon}
                                    </div>
                                    <span className="text-xs text-gray-700 font-medium">{c.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Popular Restaurants */}
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-gray-800">Popular Stalls</h2>
                            <button className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                                View All →
                            </button>
                        </div>
                        <PopRestaurants restaurants={restaurants} onCardClick={handleCardClick} />
                    </section>

                    {/* All Restaurants */}
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-gray-800">All Stalls</h2>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                {restaurants.length} stalls
                            </span>
                        </div>
                        {restaurants.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {restaurants.map((restaurant, index) => (
                                    <StallsCard
                                        key={restaurant.stallNo}
                                        index={index}
                                        image={restaurant.image}
                                        name={restaurant.name}
                                        rating={restaurant.rating}
                                        stallNo={restaurant.stallNo}
                                        offer={restaurant.offer}
                                        onClick={() => handleCardClick(restaurant.name)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">ค้นหา</div>
                                <p className="text-gray-600">No restaurants available at the moment.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}

