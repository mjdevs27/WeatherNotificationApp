import { useEffect, useMemo, useState } from 'react';
import './index.css';
import CitySearch from './components/CitySearch.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import ThresholdForm from './components/ThresholdForm.jsx';
import AlertBanner from './components/AlertBanner.jsx';
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/weatherApi.js';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/storage.js';

const STORAGE_KEYS = {
  city: 'weather.city',
  thresholds: 'weather.thresholds',
  apiKey: 'weather.apiKey',
};

function App() {
  const [apiKey, setApiKey] = useState('');
  const [city, setCity] = useState(loadFromLocalStorage(STORAGE_KEYS.city, ''));
  const [thresholds, setThresholds] = useState(
    loadFromLocalStorage(STORAGE_KEYS.thresholds, {
      minTemp: '',
      maxTemp: '',
      minHumidity: '',
      maxHumidity: '',
      windSpeed: '',
      units: 'metric',
    })
  );
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API key not needed for sample data
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.city, city);
  }, [city]);
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.thresholds, thresholds);
  }, [thresholds]);

  async function searchByCity(nextCity) {
    try {
      setError('');
      setLoading(true);
      const data = await fetchWeatherByCity({ city: nextCity, units: thresholds.units });
      setCity(nextCity);
      setWeather(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function useMyLocation() {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported by your browser.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherByCoords({ lat: latitude, lon: longitude, units: thresholds.units });
      setCity(data.cityName);
      setWeather(data);
    } catch (e) {
      setError(e.message || 'Failed to get location');
    } finally {
      setLoading(false);
    }
  }

  const alerts = useMemo(() => {
    if (!weather) return [];
    const out = [];
    const { minTemp, maxTemp, minHumidity, maxHumidity, windSpeed } = thresholds;
    if (minTemp !== '' && weather.temperature < Number(minTemp)) {
      out.push(`Temperature is below minimum (${weather.temperature} < ${minTemp}).`);
    }
    if (maxTemp !== '' && weather.temperature > Number(maxTemp)) {
      out.push(`Temperature is above maximum (${weather.temperature} > ${maxTemp}).`);
    }
    if (minHumidity !== '' && weather.humidity < Number(minHumidity)) {
      out.push(`Humidity is below minimum (${weather.humidity}% < ${minHumidity}%).`);
    }
    if (maxHumidity !== '' && weather.humidity > Number(maxHumidity)) {
      out.push(`Humidity is above maximum (${weather.humidity}% > ${maxHumidity}%).`);
    }
    if (windSpeed !== '' && weather.windSpeed > Number(windSpeed)) {
      out.push(`Wind speed is above maximum (${weather.windSpeed} > ${windSpeed}).`);
    }
    return out;
  }, [weather, thresholds]);

  return (
    <div className="page">
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 className="title">Weather Watch</h1>
          <p className="muted">Set thresholds and get instant visual alerts.</p>
        </header>

        <section className="panel" style={{ marginBottom: '1rem' }}>
          <div className="layout">
            <div>
              <CitySearch onSearch={searchByCity} defaultCity={city} />
              <button onClick={useMyLocation} className="btn btn-secondary" style={{ width: '100%', marginTop: '0.6rem' }}>
                Use My Location (random sample)
              </button>
            </div>
            <div className="muted">
              This demo uses offline sample data. Try cities like: London, New York, Mumbai, Tokyo.
            </div>
          </div>
        </section>

        {alerts.length > 0 && (
          <section style={{ marginBottom: '1rem' }}>
            <AlertBanner messages={alerts} />
          </section>
        )}

        <section className="layout" style={{ marginBottom: '1rem' }}>
          <div className="panel">
            <h3>Thresholds</h3>
            <ThresholdForm value={thresholds} onChange={setThresholds} />
          </div>
          <div className="column">
            {loading && <div className="card">Loading weather...</div>}
            {error && <div className="alert">{error}</div>}
            {weather && <WeatherCard data={weather} units={thresholds.units} />}
          </div>
        </section>

        <footer style={{ textAlign: 'center' }} className="muted">
          Demo uses offline sample weather data. Settings are saved locally.
        </footer>
      </div>
    </div>
  );
}

export default App;
