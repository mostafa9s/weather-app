"use client"

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
}