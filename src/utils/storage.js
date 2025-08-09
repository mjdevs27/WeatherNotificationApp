export function saveToLocalStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    // Ignore storage errors
  }
}

export function loadFromLocalStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return defaultValue;
    return JSON.parse(raw);
  } catch (error) {
    return defaultValue;
  }
}



