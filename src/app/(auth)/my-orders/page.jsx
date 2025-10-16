'use client';
import { useEffect, useState } from 'react';
import useProtectedRoute from "../../../components/hook/useProtectedRoute";
const STATUS_STEPS = ['Confirmed', 'Preparing', 'Out for delivery', 'Delivered'];
const STATUS_COLORS = {
  Confirmed: 'bg-gray-100 text-gray-800',
  Preparing: 'bg-orange-100 text-orange-800',
  'Out for delivery': 'bg-yellow-100 text-yellow-800',
  Delivered: 'bg-green-100 text-green-800',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('Guest');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    // Get username and phone from localStorage
    const savedName = localStorage.getItem('signup_name');
    const savedPhone = localStorage.getItem('signup_phone');
    if (savedName) setUsername(savedName);
    if (savedPhone) setUserPhone(savedPhone);

    // Get all orders
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');

    // Filter orders for the logged-in user based on phone number
    const userOrders = allOrders.filter(order => order.phone === savedPhone);
    setOrders(userOrders);
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.status === 'Delivered') return order;

          const elapsed = Date.now() - order.timestamp;
          const totalDeliveryTime = 30 * 60 * 1000; // 30 mins delivery simulation
          const timeLeft = Math.max(totalDeliveryTime - elapsed, 0);

          // Update status based on elapsed time
          let newStatus = order.status;
          if (elapsed > totalDeliveryTime * 0.75) newStatus = 'Delivered';
          else if (elapsed > totalDeliveryTime * 0.5) newStatus = 'Out for delivery';
          else if (elapsed > totalDeliveryTime * 0.25) newStatus = 'Preparing';

          return { ...order, status: newStatus, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const goBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto mt-[90px]">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">My Orders</h1>
        <p className="text-center text-gray-700 mb-6">
          Welcome, <span className="font-semibold">{username}</span>!
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600 mb-6">You have no orders yet.</p>
            <button
              onClick={goBack}
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-bold shadow-md transition-all"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-lg p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800">Order #{idx + 1}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  Ordered at: {new Date(order.timestamp).toLocaleTimeString()}
                </p>

                <ul className="divide-y divide-gray-200 mb-4 max-h-60 overflow-y-auto scrollbar-hide">
                  {order.items.map(item => (
                    <li key={item.name} className="py-2 flex justify-between">
                      <span>{item.name} × {item.count}</span>
                      <span className="font-bold text-orange-600">₹{(item.count * item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                {order.status !== 'Delivered' && (
                  <p className="text-sm text-gray-500 mb-2">Estimated time left: {formatTime(order.timeLeft)}</p>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
