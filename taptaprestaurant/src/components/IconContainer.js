export default function IconContainer({ icon, prependText, text, children }) {
  return (
    <div className="icon-container">
      {icon && <i className={icon}></i>}
      {prependText && <span>{prependText}</span>}
      <span>{text}</span>
      {children}
    </div>
  );
}
