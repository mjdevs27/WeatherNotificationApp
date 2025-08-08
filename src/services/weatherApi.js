import sampleData from '../data/sampleWeather.json';

export async function fetchWeatherByCity({ city, units = 'metric' }) {
  const match = sampleData.find(
    (w) => w.cityName.toLowerCase() === String(city || '').toLowerCase()
  );
  if (!match) {
    const available = sampleData.map((w) => w.cityName).join(', ');
    throw new Error(`City not found in sample data. Try one of: ${available}`);
  }
  return withUnits(match, units);
}

export async function fetchWeatherByCoords({ units = 'metric' }) {
  // Without a live API, return a random sample
  const match = sampleData[Math.floor(Math.random() * sampleData.length)];
  return withUnits(match, units);
}

function withUnits(entry, units) {
  if (units === 'imperial') {
    return {
      ...entry,
      temperature: cToF(entry.temperature),
      feelsLike: cToF(entry.feelsLike),
      windSpeed: msToMph(entry.windSpeed),
    };
  }
  return entry;
}

function cToF(c) {
  if (c === null || c === undefined) return c;
  return (c * 9) / 5 + 32;
}

function msToMph(ms) {
  if (ms === null || ms === undefined) return ms;
  return ms * 2.23694;
}


