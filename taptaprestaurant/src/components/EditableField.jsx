import { useState } from "react";
import IconContainer from "./IconContainer";
import EditIcon from "./EditIcon";

export default function EditableField({
  text,
  icon,
  onChange = () => {},
  prependText,
  type = "text",
}) {
  const [newValue, setNewValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  function handleInputChange(value) {
    setNewValue(value);
    onChange(value);
  }

  const handleInput = (event) => {
    const val =
      type === "number" ? parseInt(event.target.value) : event.target.value;

    event.key === "Enter" ? handleInputChange(val) : setNewValue(val || 0);
  };

  const handleBlur = (event) => {

    if (event.target.value !== text) {
      handleInputChange(
        type === "number" ? parseInt(event.target.value) : event.target.value
      );
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="edit-field">
          {prependText && <span>{prependText}</span>}
          <input
            autoFocus
            type={type}
            value={type === "number" ? parseInt(newValue) : newValue}
            size={newValue.length + 2 || 4}
            onInput={handleInput}
            onBlur={handleBlur}
          />
          <button>
            <i className="bx bx-check text-success"></i>
          </button>
        </div>
      ) : (
        <IconContainer icon={icon} prependText={prependText} text={text}>
          <EditIcon
            onClick={() => {
              setIsEditing(true);
            }}
          />
        </IconContainer>
      )}
    </div>
  );
}
