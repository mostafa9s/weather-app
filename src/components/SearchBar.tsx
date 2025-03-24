"use client"

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        type="submit" 
        className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold 
                 shadow-md hover:bg-blue-600 active:bg-blue-700 
                 transition-colors duration-200 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}