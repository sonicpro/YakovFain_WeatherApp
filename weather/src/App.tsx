import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Weather } from './Interfaces/Weather.js';

const App: React.FC = () => {
  // Initial state for the component is "London".
  const [city, setCity] = useState('London');
  // Initial state for "weather" state of the compontent is null.
  const [weather, setWeather] = useState<Weather>(null as unknown as Weather);

  // useEffect hook has no dependency state (no seconf parameter is provided), so it executes only for the initial component render.
  useEffect(() => {
    // getWeather returns Promise<void> but the callback to useEffect must return woid. Wrap the async function to invoke inside a non-async wrapper.
    const localWrapper = async () => {
      await getWeather(city);
    };
    localWrapper();
  });

  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  const query = "&units=metric&appid=<put your appid here>";

  const getWeather = async (city: string) => {
    const response = await fetch(baseUrl + city + query);
    if (response.status === 200) {
      const jsonWeather = await response.json();
      // Do not set "weather" state directly, but through setWeather hook.
      const tempWeather: Weather = {
        ...jsonWeather.main, city: jsonWeather.name
      };
      //
      setWeather(tempWeather);
    } else {
      setWeather(null as unknown as Weather);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Updating the component state as React onChange fires.
    // React onChange behaves as DOM native onInput, i.e. fires continuously as the user types.
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="Enter city" onChange={handleChange} />
        <button type="submit">Get weather</button>
        <h2>City: {city}</h2>
        {weather && <h2>Temperature: {weather.temp}C</h2>}
      </form>
    </div>
  );
}

export default App;
