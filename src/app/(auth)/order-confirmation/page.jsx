'use client';
import { useEffect, useState } from 'react';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('latestOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  const goBack = () => window.history.back();

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No order found</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't placed an order yet.</p>
          <button
            onClick={goBack}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const { items, totalPrice } = order;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-orange-600 mb-2 text-center">Order Confirmed!</h1>
          <p className="text-gray-700 text-center">Thank you for your order. Here's your summary:</p>
        </div>

        <ul className="divide-y divide-gray-200 mb-6 max-h-80 overflow-y-auto scrollbar-hide">
          {items.map((item) => (
            <li key={item.name} className="py-3 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-500">Qty: {item.count} × ₹{item.price}</span>
              </div>
              <span className="font-bold text-orange-600">₹{(item.count * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center bg-amber-50 p-4 rounded-xl mb-6 shadow-inner">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-xl font-extrabold text-orange-600">₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={goBack}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Back to Menu
        </button>
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
