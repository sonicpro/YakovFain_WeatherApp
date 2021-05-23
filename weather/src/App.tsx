import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Weather } from './Interfaces/Weather';
import WeatherInfo from './weather-info';

const App: React.FC = () => {
  // Initial state for the component is "London".
  const [city, setCity] = useState('London');
  // Initial state for "weather" state of the compontent is null.
  const [weather, setWeather] = useState<Weather>(null as unknown as Weather);

  // Deliberately pass the empty deps array as the second parameter to avoid executing the hook as the "city" state changes.
  useEffect(() => {
    // getWeather returns Promise<void> but the callback to useEffect must return void. Wrap the async function to invoke inside a non-async wrapper.
    const localWrapper = async () => {
      await getWeather(city);
    };
    localWrapper();
// eslint-disable-next-line    
  }, []);

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
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  // Defining the type guard for the weather state.
  // Type guard is a function that has a return type of type predicate (like "value is boolean").
  // Anytyme that the function parameter type is compatible with the type specified in the predicate,
  // the parameter will be narrowed to that type.
  const has = (value: any): value is boolean => value;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter city" onInput={handleChange} />
        <button type="submit">Get weather</button>
      </form>
      {has(weather) ? (
        <WeatherInfo weather={weather}>
          <strong>Hello from the parent!</strong>
        </WeatherInfo>
      ) : (
        <h2>No weather available</h2>
      )}
    </>
  );
}

export default App;
