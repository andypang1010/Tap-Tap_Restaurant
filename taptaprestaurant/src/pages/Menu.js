import { useState, useEffect } from "react";
import io from "socket.io-client";
import RestaurantDataListener from "../components/RestaurantDataListener";
import TypeSelect from "../components/TypeSelect";
import CategorySelect from "../components/CategorySelect";
import "./Menu.css";
import {
  Button,
  Modal,
  Form,
  InputGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

function VegetarianTooltip() {
  return (
    <Tooltip>
      <strong>Vegetarian</strong>
    </Tooltip>
  );
}

function AddMenuItemTooltip() {
  return (
    <Tooltip>
      <strong>Add New Menu Item</strong>
    </Tooltip>
  );
}

function AllergyTooltip(allergies) {
  return (
    <Tooltip>
      <p>
        <strong>Allergies:</strong>
      </p>
      {allergies.map((item, i) => (
        <p>
          <em>{item}</em>
        </p>
      ))}
    </Tooltip>
  );
}

const menuButtonData = [
  {
    text: "All",
    color: "default",
  },
  {
    text: "Course",
    color: "course",
  },
  {
    text: "Main",
    color: "main",
  },
  {
    text: "Appetizer",
    color: "appetizer",
  },
  {
    text: "A La Carte",
    color: "alacarte",
  },
  {
    text: "Dessert",
    color: "dessert",
  },
  {
    text: "Breakfast",
    color: "breakfast",
  },
  {
    text: "Lunch",
    color: "lunch",
  },
  {
    text: "Dinner",
    color: "dinner",
  },
  {
    text: "Alcohol",
    color: "alcohol",
  },
  {
    text: "Beverage",
    color: "beverage",
  },
];

export default function Menu({ socket = io("http://localhost:8008") }) {
  const [data, setData] = useState(null);

  function handleMenuUpdate() {
    if (socket) {
      socket.emit("updateMenu", data);

      socket.on("success", (newData) => {
        console.log("newdata: ", newData);
      });

      socket.on("server-error", (error) => {
        console.log("error: ", error);
      });
    }
  }

  useEffect(() => {
    data !== null && (document.title = `${data.name} Menu`);
    console.log(data);
  }, [data]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Menu</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      <MenuBox data={data} onMenuUpdate={handleMenuUpdate} socket={socket} />
    </main>
  );
}

function MenuBox({ data, onMenuUpdate, socket }) {
  const [activeButton, setActiveButton] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const filteredItems =
    (data !== null &&
      data.menu.filter(
        (item) =>
          item.type.toLowerCase() === activeButton.toLowerCase() ||
          activeButton === "All"
      )) ||
    [];

  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

  const handleClose = () => setShowAddModal(false);
  const handleShow = () => setShowAddModal(true);

  return (
    <section className="content-box box">
      <div className="menu-button-list">
        {menuButtonData.map((button) => (
          <MenuButton
            active={button.text === activeButton}
            key={button.text}
            text={button.text}
            color={button.color}
            onClick={() => {
              handleButtonClick(button.text);
            }}
          />
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="current-filter-name">
          <span>{activeButton}</span>
          {filteredItems.length > 0 && <small>({filteredItems.length})</small>}
        </h4>
        <OverlayTrigger placement="top" overlay={AddMenuItemTooltip()}>
          <button
            className="add-button small-shadow taptap-red"
            onClick={handleShow}
          >
            <i className="bx bx-plus"></i>
          </button>
        </OverlayTrigger>
        <AddMenuItemModal
          show={showAddModal}
          onHide={handleClose}
          socket={socket}
          username={data !== null ? data.username : ""}
        />
      </div>

      <ul className="menu-list">
        {data === null ? (
          <>
            <DummyMenuItem key="1" />
            <DummyMenuItem key="2" />
            <DummyMenuItem key="3" />
            <DummyMenuItem key="4" />
            <DummyMenuItem key="5" />
            <DummyMenuItem key="6" />
          </>
        ) : filteredItems.length === 0 ? (
          <li key="no-items">
            <h5>No items matching this filter.</h5>
          </li>
        ) : (
          filteredItems.map((item, i) => (
            <MenuItem key={i} item={item} onUpdate={onMenuUpdate} />
          ))
        )}
      </ul>
    </section>
  );
}

function MenuButton({ text, color, onClick = () => {}, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`menu-button border-${color} ${
        active ? `active active-${color}` : ""
      }`}
    >
      {text}
    </button>
  );
}

function MenuItem({ item, onUpdate = () => {} }) {
  const [border, setBorder] = useState("border-main");

  useEffect(() => {
    switch (item.type) {
      case "Course":
        setBorder("border-course");
        break;
      case "Main":
        setBorder("border-main");
        break;
      case "Breakfast":
        setBorder("border-breakfast");
        break;
      case "Lunch":
        setBorder("border-lunch");
        break;
      case "Dinner":
        setBorder("border-dinner");
        break;
      case "Appetizer":
        setBorder("border-appetizer");
        break;
      case "Dessert":
        setBorder("border-dessert");
        break;
      case "A la carte":
        setBorder("border-alacarte");
        break;
      case "Alcohol":
        setBorder("border-alcohol");
        break;
      case "Beverage":
        setBorder("border-beverage");
        break;
      default:
        return;
    }
  }, [item]);

  return (
    <li className={`menu-item-box ${border}`}>
      <h6 className="menu-item-name">{item.name}</h6>
      <p>
        <em>{item.category}</em>
      </p>
      <p>
        <small>&#165;{item.price}</small>
      </p>
      <span className="menu-item-description"></span>
      <div className="menu-item-icons">
        {item.allergies.length > 0 && (
          <OverlayTrigger
            placement="top"
            overlay={AllergyTooltip(item.allergies)}
          >
            <i className="bx bx-body text-danger"></i>
          </OverlayTrigger>
        )}
        {item.vegetarian && (
          <OverlayTrigger placement="top" overlay={VegetarianTooltip()}>
            <i className="bx bxs-leaf text-success"></i>
          </OverlayTrigger>
        )}
      </div>
    </li>
  );
}

function AddMenuItemModal({ show, onHide, socket, username }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    type: "",
    category: "",
    vegetarian: false,
    available: true,
    allergies: [],
    ingredients: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (socket) {
        socket.emit("addMenuItem", {
          item: formData,
          username,
        });

        socket.on("success", (response) => {
          //console.log("newdata: ", response);
          onHide();
        });

        socket.on("failed", (error) => {
          console.log("error: ", error);
          setErrorMessage("Failed to create new menu item");
        });

        socket.on("server-error", (error) => {
          console.log("error: ", error);
        });
      } else {
        console.log("socket not enabled");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleInputChange = (e) => {
    console.log(formData);
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

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              placeholder="Enter new item name"
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.description}
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
                value={formData.price}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
            <div>
              <Form.Label>Type:</Form.Label>
              <TypeSelect value={formData.type} onChange={handleInputChange} />
            </div>
            <div>
              <Form.Label>Category:</Form.Label>
              <CategorySelect
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check
              id="vegetarian"
              type="checkbox"
              label="Is this item vegetarian?"
              name="vegetarian"
              value={formData.vegetarian}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              id="available"
              type="checkbox"
              label="Is this item currently available?"
              name="available"
              value={formData.available}
              onChange={handleInputChange}
              defaultChecked
            />
          </Form.Group>
          <p className="error-message">{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="submit-button" type="submit">
            Add Item
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function DummyMenuItem() {
  return (
    <li className="menu-item-box dummy-menu-box border-default">
      <span className="dummy">----------Name-----------</span>
      <span>
        <small className="dummy">-Type-</small>
      </span>
      <span>
        <small className="dummy">--Price--</small>
      </span>
      <div className="dummy-icons">
        <div className="dummy dummy-icon"></div>
        <div className="dummy dummy-icon"></div>
      </div>
    </li>
  );
}
