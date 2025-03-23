export async function fetchWeather(city: string) {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404 || data.cod === '404') {
        throw new Error(`City "${city}" not found`);
      }
      throw new Error(data.error || 'Failed to fetch weather data');
    }

    return data;
  } catch (error) {
    console.error('Weather API Error:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}