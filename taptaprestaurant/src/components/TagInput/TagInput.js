import { useState } from "react";
import "./TagInput.css";

export default function TagInput({ tags, onSetTags }) {
  const [newTag, setNewTag] = useState("");

  function handleChange(e) {
    if (e.target.value !== ",") setNewTag(e.target.value);
  }

  function handleKeyDown(e) {
    if ((e.key !== "Enter" && e.key !== ",") || e.target.value === "") return;

    onSetTags([...tags, e.target.value]);
    setNewTag("");
  }

  function handleRemoveTag(tag) {
    onSetTags(tags.filter((item) => item !== tag));
  }

  function handleRemoveAllTags(e) {
    e.preventDefault();
    onSetTags([]);
  }

  return (
    <div>
      <p>
        <small className="text-muted">
          Press enter or add a comma after each tag.
        </small>
      </p>
      <ul className="tag-list form-control">
        {tags.map((tag, i) => (
          <li key={i} className="tag">
            <span>{tag}</span>
            <i
              className="bx bxs-x-circle remove-tag-button"
              onClick={() => {
                handleRemoveTag(tag);
              }}
            ></i>
          </li>
        ))}
        <textarea
          rows={2}
          className="tag-input"
          value={newTag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
        />
      </ul>
      <div className="tag-input-details">
        <small className="text-muted">
          {tags.length === 0 ? "None" : tags.length}
        </small>
        <button className="remove-all-tags" onClick={handleRemoveAllTags}>
          Remove All
        </button>
      </div>
    </div>
  );
}
