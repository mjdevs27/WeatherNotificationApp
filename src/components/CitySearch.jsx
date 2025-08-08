import { useState } from 'react';

export default function CitySearch({ onSearch, defaultCity }) {
  const [city, setCity] = useState(defaultCity || '');

  function handleSubmit(e) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch?.(city.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g. London)"
        className="input"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}


