export default function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}) {
  return (
    <div className={`section-title ${light ? "light-title" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}
