import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import TypeSelect from "./TypeSelect";
import CategorySelect from "./CategorySelect";
import TagInput from "./TagInput/TagInput";
import axios from "axios";
import { useNotification } from "./NotificationContext";
import Spinner from "./Spinner/Spinner";

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
  thumbnail: "",
};

export default function MenuItemModal({
  mode = "New",
  show,
  onHide,
  defaultData,
}) {
  const { sendNotification } = useNotification();
  const [prevItemName, setPrevItemName] = useState(null);
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "New") {
        axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
        axios
          .post("https://taptap-414502.uw.r.appspot.com/menu/addMenuItem", {
            item: formData,
            image,
            restaurantName: "makoto", // TODO
          })
          .then(() => {
            sendNotification(
              "success",
              `Successfully created menu item ${formData.name}`
            );
            axios.defaults.headers.common["Content-Type"] = "application/json";
            setIsLoading(false);
            onHide();
            handleClearFormData();
          })
          .catch((error) => {
            console.log("error: ", error);
            sendNotification(
              "error",
              `Failed to create new menu item: ${error.response.data}`
            );
            axios.defaults.headers.common["Content-Type"] = "application/json";
            setIsLoading(false);
          });
      } else if (mode === "Edit") {
        axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

        axios
          .post("https://taptap-414502.uw.r.appspot.com/menu/updateMenuItem", {
            item: formData,
            image,
            prevItemName,
            restaurantName: "makoto",
          })
          .then((response) => {
            console.log(response);
            sendNotification(
              "success",
              `Successfully updated menu item ${formData.name}`
            );
            axios.defaults.headers.common["Content-Type"] = "application/json";
            setIsLoading(false);
            onHide();
          })
          .catch((error) => {
            console.log(error);
            sendNotification(
              "error",
              `Failed to update menu item: ${error.response.data}`
            );
            axios.defaults.headers.common["Content-Type"] = "application/json";
            setIsLoading(false);
          });
      } else {
        sendNotification("error", "Unknown mode");
      }
    } catch (error) {
      axios.defaults.headers.common["Content-Type"] = "application/json";
      sendNotification("error", error);
    }
  };

  const handleClearFormData = () => {
    setFormData(blankFormData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target, formData);
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
    if (defaultData) {
      setFormData({
        ...blankFormData,
        ...defaultData,
      });
      setPrevItemName(defaultData.name);
    } else {
      setFormData(blankFormData);
    }
  }, [defaultData]);

  useEffect(() => {
    console.log("Image", image);
  }, [image]);

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
          <fieldset disabled={isLoading ? true : null}>
            <Form.Group className="mb-3 required">
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
            <Form.Group className="mb-3 d-flex align-items-center gap-4">
              <Form.Label>Thumbnail:</Form.Label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
              />
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-stretch gap-2">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={isLoading ? true : null}
            >
              Back
            </Button>
            <Button
              className="submit-button"
              variant="danger"
              type="submit"
              disabled={isLoading ? true : null}
            >
              {!isLoading ? mode === "New" ? "Create" : "Save" : <Spinner />}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
