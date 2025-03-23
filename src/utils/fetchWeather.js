// utils/fetchWeather.js
import axios from 'axios';

const API_KEY = 'e9a97c946c2232a1c9bb37cdc38149a9';  

export const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
};
