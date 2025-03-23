"use client"

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchWeather } from '../utils/fetchWeather';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async (city: string) => {
    try {
      setError(null);
      setCity(city);
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setWeatherData(null);
      setError('Unable to fetch weather data. Please try again.');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-4">Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {weatherData && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl">{weatherData.name}, {weatherData.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="mx-auto"
          />
          <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-lg">{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

