"use client"

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import { fetchWeather } from '../utils/fetchWeather';
import { getWeatherImage } from '../utils/getWeatherImage';

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: Array<{ description: string; icon: string }>;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    try {
      setError(null);
      setWeatherData(null); // Clear previous data immediately
      const data = await fetchWeather(city);
      
      // Add 1 second delay before showing the result
      setTimeout(() => {
        setWeatherData(data);
      }, 1000);
      
    } catch (error: any) {
      setTimeout(() => {
        setWeatherData(null);
        setError(error.message.includes('not found') ? 'Unknown city' : 'Unable to fetch weather data. Please try again.');
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col relative border border-white/20 rounded-3xl shadow-lg backdrop-blur-sm overflow-hidden">
      <h1 className="text-4xl text-center mb-4">Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {weatherData && (
        <>
          {/* Background Image - increased opacity from 0.3 to 0.5 */}
          <div 
            className="absolute inset-0 -z-10 opacity-60 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${getWeatherImage(weatherData.main.temp, weatherData.weather[0].description)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="mt-4 text-center relative z-10 bg-white/30 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
            <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg">{weatherData.weather[0].description}</p>
          </div>
        </>
      )}
      <footer className="text-center mt-auto pt-8 relative z-10">
        <p className="bg-white/40 backdrop-blur-sm py-2 px-4 rounded-full inline-block shadow-lg text-sm">
          Created with <span className="text-white text-base animate-pulse">❤</span> by{' '}
          <span className="font-bold text-blue-600">mostafa</span>
        </p>
      </footer>
    </div>
);
}

