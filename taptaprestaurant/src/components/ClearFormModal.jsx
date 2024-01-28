import { Button, Form, Modal } from "react-bootstrap";

export default function ClearFormModal({ show, onHide, onClear }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClear();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear the New User form?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="danger" type="submit">
            Clear
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
