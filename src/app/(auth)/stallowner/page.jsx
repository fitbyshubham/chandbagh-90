"use client";
import Search from "../../../components/ui/search";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialOrders = [
  {
    id: "F002",
    name: "Hemant",
    phone: "9823456789",
    items: [
      { name: "Paneer Tikka", quantity: 1, price: 250 },
      { name: "Butter Naan", quantity: 2, price: 80 },
    ],
    date: 17,
  },
  {
    id: "F003",
    name: "Vibhor",
    phone: "9812345678",
    items: [
      { name: "Veg Burger", quantity: 2, price: 180 },
      { name: "Peri-Peri French Fries", quantity: 1, price: 90 },
    ],
    date: 18,
  },
];

export default function FoodOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(17);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const savedName = localStorage.getItem("signup_name");
    if (savedName) setUserName(savedName);
  }, []);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);
  const handleRemove = (id) => setOrders((prev) => prev.filter((o) => o.id !== id));
  const getTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const filteredOrders = orders.filter(
    (o) =>
      o.date === selectedDate &&
      (o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone.includes(searchQuery))
  );

  const dates = [17, 18];

  return (
    <div className="mx-8">
      <div className="min-h-screen bg-white flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-5 mb-4 text-gray-900">
          Hello, {userName}!
        </h1>

        <div className="flex space-x-4 mb-5">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-full font-semibold ${
                selectedDate === date
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mb-4 mx-3 bg-white">
          <Search onSearch={(q) => setSearchQuery(q)} />
        </div>

        <AnimatePresence>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedId === order.id;
              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full max-w-md rounded-xl mb-4 p-5 cursor-pointer shadow-lg transition-all ${
                    isExpanded ? "border-2 border-orange-500 bg-white" : "border border-gray-300 bg-white"
                  }`}
                  onClick={() => toggleExpand(order.id)}
                >
                  <motion.div layout className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{order.name}</p>
                      <p className="text-xs text-gray-500">ID: {order.id} • {order.phone}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-gray-400 transition-transform"
                    >
                      ▼
                    </motion.span>
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gray-200 mt-4 pt-4 text-gray-700"
                      >
                        <ul className="space-y-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-gray-800 font-medium">
                              <span>{item.name} × {item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex justify-between mt-3 font-semibold text-gray-900">
                          <span>Total</span>
                          <span>₹{getTotal(order.items)}</span>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); handleRemove(order.id); }}
                            className="px-4 py-2 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition-all"
                          >
                            Delivered
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); handleRemove(order.id); }}
                            className="px-4 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-900 shadow-sm transition-all"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600 text-sm mt-12">
              No orders for this date or search query!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
