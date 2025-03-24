export const getWeatherImage = (temp: number, description: string): string => {
  const desc = description.toLowerCase();
  
  // Check for all types of cloudy conditions
  if (desc.includes('cloud') || 
      desc.includes('overcast') || 
      desc.includes('scattered') || 
      desc.includes('broken')) {
    return '/weather-icons/cloud.jpg';
  }
  
  // Check for all types of rain conditions
  if (desc.includes('rain') || 
      desc.includes('drizzle') || 
      desc.includes('shower') || 
      desc.includes('thunderstorm')) {
    return '/weather-icons/rain.jpg';
  }

  // Clear sky conditions
  if (desc.includes('clear') || desc.includes('sunny')) {
    return '/weather-icons/clear.jpg';
  }

  // Snow conditions
  if (desc.includes('snow') || desc.includes('sleet') || desc.includes('blizzard')) {
    return '/weather-icons/snow.jpg';
  }

  // Misty/Foggy conditions
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) {
    return '/weather-icons/mist.jpg';
  }
  
  return '/weather-icons/clear.jpg'; // Default to clear sky image for any unmatched condition
};