export default function IconContainer({ icon, prependText, text, children }) {
  return (
    <div className="icon-container">
      <i className={icon}></i>
      {prependText && <span>{prependText}</span>}
      <span>{text}</span>
      {children}
    </div>
  );
}
