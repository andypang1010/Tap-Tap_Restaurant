import { useState, useEffect, Children } from "react";
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
      <div className="d-flex align-items-center justify-content-between mb-4 lh-1">
        <h4 className="current-filter-name">
          <span>{activeButton}</span>
          {filteredItems.length > 0 && <small>({filteredItems.length})</small>}
        </h4>
        <button
          className="add-button small-shadow d-flex align-items-center"
          onClick={handleShow}
        >
          <i className="bx bx-plus"></i>
          <span>Add New Item</span>
        </button>
        <AddMenuItemModal
          show={showAddModal}
          onHide={handleClose}
          socket={socket}
          username={data !== null ? data.username : ""}
        />
      </div>

      <Pagination itemsPerPage={10}>
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
      </Pagination>
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

        socket.on("success", () => {
          onHide();
          clearFormData();
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

  function clearFormData() {
    setFormData({
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
  }

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
    console.log(formData);
  }, [formData]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
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
          <Form.Group className="mb-3">
            <Form.Label>Ingredients:</Form.Label>
            <TagInput
              tags={formData.ingredients}
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
              tags={formData.allergies}
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
    <li className="dummy-container menu-item-box ">
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

function TagInput({ tags, onSetTags }) {
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

function Pagination({ itemsPerPage = 10, children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredItems, setFilteredItems] = useState(
    Children.toArray(children)
  );

  const listLength = filteredItems.length;

  useEffect(() => {
    setFilteredItems(
      Children.toArray(children).filter(
        (item) =>
          item.props.item?.name.includes(searchTerm) ||
          item.props.item?.description.includes(searchTerm)
      )
    );
  }, [searchTerm, children]);

  useEffect(() => {
    setCurrentPage(1);
  }, [children]);

  const totalPages = Math.ceil(listLength / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="pagination-addon-container">
        <InputGroup className="w-75">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <i className="bx bx-search-alt-2"></i>
          </InputGroup.Text>
        </InputGroup>

        <div className="page-buttons">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="first-page-button"
          >
            <i className="bx bx-first-page"></i>
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="increment-button"
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <span className="page-details">
            {listLength > 0
              ? `Page ${currentPage} of ${totalPages}`
              : `No results`}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || listLength === 0}
            className="increment-button"
          >
            <i className="bx bx-chevron-right"></i>
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || listLength === 0}
            className="last-page-button"
          >
            <i className="bx bx-last-page"></i>
          </button>
        </div>
        <span className="pagination-stats">
          {listLength > 0 && (
            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {itemsPerPage * currentPage > listLength
                  ? listLength
                  : itemsPerPage * currentPage}
              </strong>{" "}
              of <strong>{listLength}</strong> entries
            </span>
          )}
        </span>
      </div>

      <ul className="d-flex flex-wrap gap-2 align-items-center justify-content-start mb-4">
        {filteredItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
    </div>
  );
}
