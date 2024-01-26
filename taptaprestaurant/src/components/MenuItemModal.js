import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import TypeSelect from "./TypeSelect";
import CategorySelect from "./CategorySelect";
import TagInput from "./TagInput/TagInput";

const blankFormData = {
  name: "",
  description: "",
  price: 0,
  type: "",
  category: "",
  vegetarian: false,
  available: true,
  allergies: [],
  ingredients: [],
};

export default function MenuItemModal({
  mode = "New",
  show,
  onHide,
  socket,
  username,
  defaultData,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (socket) {
        socket.emit("addMenuItem", {
          item: formData,
          username,
        });

        socket.on("success", () => {
          onHide();
          handleClearFormData();
        });

        socket.on("failed", (error) => {
          console.log("error: ", error);
          setErrorMessage("Failed to create new menu item");
        });

        socket.on("server-error", (error) => {
          console.log("error: ", error);
          setErrorMessage("Something went wrong. Try refreshing the page.");
        });
      } else {
        console.log("socket not enabled");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleClearFormData = () => {
    setFormData(blankFormData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseInt(value)
        : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  useEffect(() => {
    if (defaultData !== undefined && defaultData !== null) {
      setFormData({
        ...blankFormData,
        ...defaultData,
      });
    } else {
      setFormData(blankFormData);
    }
  }, [defaultData]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{mode} Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              placeholder="Enter new item name"
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter brief item description"
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price:</Form.Label>
            <InputGroup className="mb-3 price-input">
              <InputGroup.Text>
                <i className="bx bx-yen"></i>
              </InputGroup.Text>
              <Form.Control
                type="number"
                min="0"
                step="100"
                placeholder="100"
                name="price"
                value={formData?.price}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
            <div>
              <Form.Label>Type:</Form.Label>
              <TypeSelect val={formData?.type} onChange={handleInputChange} />
            </div>
            <div>
              <Form.Label>Category:</Form.Label>
              <CategorySelect
                val={formData?.category}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ingredients:</Form.Label>
            <TagInput
              tags={formData?.ingredients}
              onSetTags={(tags) => {
                setFormData({
                  ...formData,
                  ingredients: tags,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Allergies:</Form.Label>
            <TagInput
              tags={formData?.allergies}
              onSetTags={(tags) => {
                setFormData({
                  ...formData,
                  allergies: tags,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check
              id="vegetarian"
              type="checkbox"
              label="Is this item vegetarian?"
              name="vegetarian"
              checked={formData?.vegetarian}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              id="available"
              type="checkbox"
              label="Is this item currently available?"
              name="available"
              checked={formData?.available}
              onChange={handleInputChange}
            />
          </Form.Group>
          <p className="error-message">{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button className="submit-button" type="submit">
            Add Item
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
