import React, { useState, ChangeEvent } from 'react';

const App: React.FC = () => {
  // Initial state for the component is an empty string.
  const [city, setCity] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Updating the component state as React onChange fires.
    // React onChange behaves as DOM native onInput, i.e. fires continuously as the user types.
    setCity(event.target.value);
  }

  return (
    <div>
      <form>
        <input type="text" placeholder="Enter city" onChange={handleChange} />
        <button type="submit">Get weather</button>
        <h2>City: {city}</h2>
      </form>
    </div>
  );
}

export default App;
