import { useEffect, useState } from 'react';

export default function ThresholdForm({ value, onChange }) {
  const [local, setLocal] = useState(
    value ?? {
      minTemp: '',
      maxTemp: '',
      minHumidity: '',
      maxHumidity: '',
      windSpeed: '',
      units: 'metric',
    }
  );

  useEffect(() => {
    setLocal((prev) => ({ ...prev, ...(value || {}) }));
  }, [value]);

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...local, [name]: value };
    setLocal(next);
    onChange?.(next);
  }

  const labelClass = 'label';
  const inputClass = 'input';

  return (
    <div className="grid-2">
      <div>
        <label className={labelClass}>Units</label>
        <select name="units" value={local.units} onChange={handleChange} className={inputClass}>
          <option value="metric">Metric (°C, m/s)</option>
          <option value="imperial">Imperial (°F, mph)</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Max Wind Speed</label>
        <input
          type="number"
          name="windSpeed"
          value={local.windSpeed}
          onChange={handleChange}
          placeholder="e.g. 10"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Min Temp</label>
        <input
          type="number"
          name="minTemp"
          value={local.minTemp}
          onChange={handleChange}
          placeholder="e.g. 10"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Max Temp</label>
        <input
          type="number"
          name="maxTemp"
          value={local.maxTemp}
          onChange={handleChange}
          placeholder="e.g. 35"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Min Humidity (%)</label>
        <input
          type="number"
          name="minHumidity"
          value={local.minHumidity}
          onChange={handleChange}
          placeholder="e.g. 30"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Max Humidity (%)</label>
        <input
          type="number"
          name="maxHumidity"
          value={local.maxHumidity}
          onChange={handleChange}
          placeholder="e.g. 80"
          className={inputClass}
        />
      </div>
    </div>
  );
}


