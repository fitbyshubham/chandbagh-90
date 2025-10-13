"use client";
import { useState } from "react";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send the value to parent
  };

  return (
    <div className="w-80">
      <div className="flex items-center border border-gray-300 rounded-full shadow">
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="search"
          className="w-4 h-4 opacity-60 ml-2"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Start your search"
          className="flex-1 px-3 py-1 outline-none text-gray-700 placeholder-gray-400 rounded-r-full"
        />
      </div>
    </div>
  );
}
