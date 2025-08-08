export default function WeatherCard({ data, units }) {
  if (!data) return null;

  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const speedUnit = units === 'imperial' ? 'mph' : 'm/s';

  return (
    <div className="card">
      <div className="row gap">
        {data.icon && (
          <img
            alt={data.weatherDesc}
            className="icon-lg"
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          />
        )}
        <div>
          <h2 className="title">{data.cityName}</h2>
          <p className="muted">{data.weatherDesc}</p>
        </div>
      </div>
      <div className="metrics">
        <Metric label="Temperature" value={`${round(data.temperature)} ${tempUnit}`} />
        <Metric label="Feels Like" value={`${round(data.feelsLike)} ${tempUnit}`} />
        <Metric label="Humidity" value={`${round(data.humidity)} %`} />
        <Metric label="Wind" value={`${round(data.windSpeed)} ${speedUnit}`} />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </div>
  );
}

function round(value) {
  if (value === null || value === undefined) return '—';
  return Math.round(value * 10) / 10;
}


