'use client';
import { useEffect, useState } from 'react';
import useProtectedRoute from "../../../components/hook/useProtectedRoute";
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
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="w-full max-w-md p-10 text-center bg-white shadow-xl rounded-3xl">
          <div className="mb-6 text-6xl">❌</div>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">No order found</h2>
          <p className="mb-8 text-gray-600">Looks like you haven't placed an order yet.</p>
          <button
            onClick={goBack}
            className="w-full px-6 py-4 font-semibold text-white transition-all shadow-md bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 rounded-2xl hover:shadow-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const { items, totalPrice, stallName } = order; // Destructure stallName

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-3xl font-bold text-center text-orange-600">Order Confirmed!</h1>
          <p className="text-center text-gray-700">Thank you for your order from <strong>{stallName}</strong>. Here's your summary:</p> {/* Display stall name */}
        </div>

        <ul className="mb-6 overflow-y-auto divide-y divide-gray-200 max-h-80 scrollbar-hide">
          {items.map((item) => (
            <li key={item.name} className="flex items-center justify-between py-3">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-500">Qty: {item.count} × ₹{item.price}</span>
              </div>
              <span className="font-bold text-orange-600">₹{(item.count * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between p-4 mb-6 shadow-inner bg-amber-50 rounded-xl">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-xl font-extrabold text-orange-600">₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={goBack}
          className="w-full py-3 font-bold text-white transition-all transform shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 rounded-2xl hover:shadow-xl hover:scale-105"
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