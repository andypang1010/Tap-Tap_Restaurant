import "./ActionBanner.css";

export default function ActionBanner({ selectedItems, onDelete }) {
  return (
    <div
      className={`action-banner light-bx-shadow ${
        selectedItems?.length > 0 && "action-banner--open"
      }`}
    >
      <ul className="action-banner-button-list">
        <button
          className="action-banner-button light-bx-shadow red-hover"
          onClick={() => onDelete(selectedItems)}
        >
          <span>Delete ({selectedItems?.length})</span>
          <i className="bx bx-trash"></i>
        </button>
      </ul>
    </div>
  );
}
