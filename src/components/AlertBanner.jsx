export default function AlertBanner({ messages }) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="alert">
      <ul className="list">
        {messages.map((m, idx) => (
          <li key={idx}>{m}</li>
        ))}
      </ul>
    </div>
  );
}


