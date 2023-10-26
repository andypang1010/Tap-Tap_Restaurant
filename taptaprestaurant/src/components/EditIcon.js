import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function EditIcon({ onClick }) {
  return (
    <button className="blank-button" onClick={onClick}>
      <OverlayTrigger placement="top" overlay={EditTooltip()}>
        <i className="bx bx-pencil"></i>
      </OverlayTrigger>
    </button>
  );
}

function EditTooltip() {
  return (
    <Tooltip>
      <strong>Edit</strong>
    </Tooltip>
  );
}
