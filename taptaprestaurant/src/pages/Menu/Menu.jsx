import { useState, useEffect, useContext } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./Menu.css";
import { Tooltip, OverlayTrigger, Modal, Form, Button } from "react-bootstrap";
import MenuItemModal from "../../components/MenuItemModal";
import { AuthContext, SocketContext } from "../../App";
import axios from "axios";
import { useNotification } from "../../components/NotificationContext";
import Header from "../../components/Header";
import environment from "../../environment.json"

function VegetarianTooltip() {
  return (
    <Tooltip>
      <strong>Vegetarian</strong>
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

const categoryData = [
  {
    value: "Course",
  },
  {
    value: "Sushi",
  },
  {
    value: "Sashimi",
  },
  {
    value: "Grilled Dishes",
  },
  {
    value: "Boiled Dishes",
  },
  {
    value: "Beer",
  },
  {
    value: "Sake",
  },
  {
    value: "Spirits",
  },
  {
    value: "Soft Drink",
  },
  {
    value: "Tea",
  },
];

const selectOptions = [
  "Type",
  "Category",
  "Alphabetical",
  "Price: Low to High",
  "Price: High to Low",
  "Last modified: Oldest to newest",
  "Last modified: Newest to Oldest",
];

export default function Menu() {
  const { socket, data } = useContext(SocketContext);

  return (
    <main className="main-content">
      <Header title="Menu" pageTitle="Menu" />

      <MenuBox data={data} socket={socket} />
    </main>
  );
}

function MenuBox({ data, socket }) {
  const { user } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("Type");
  const [activeButton, setActiveButton] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mode, setMode] = useState("New");
  const [itemToEdit, setItemToEdit] = useState(null);
  const [filteredItems, setFilteredItems] = useState(data?.menu);
  const [paginationFilteredItems, setPaginationFilteredItems] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

  const handleShowNewModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setMode("New");
    setItemToEdit(null);
    setShowModal(false);
  };

  const handleShowEditModal = (item) => {
    setMode("Edit");
    setItemToEdit(item);
    setShowModal(true);
  };

  const handleShowDeleteModal = (item) => {
    setShowDeleteModal(true);
    setItemToDelete(item);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    let newItems = data?.menu.filter(
      (item) =>
        item.type.toLowerCase() === activeButton.toLowerCase() ||
        activeButton === "All"
    );

    switch (sortOption) {
      case "Type":
        newItems?.sort((a, b) => {
          const indexA = menuButtonData.findIndex((item) => {
            return item.text.toLowerCase() === a.type.toLowerCase();
          });
          const indexB = menuButtonData.findIndex((item) => {
            return item.text.toLowerCase() === b.type.toLowerCase();
          });

          return indexA - indexB;
        });
        break;
      case "Category":
        newItems?.sort((a, b) => {
          const indexA = categoryData.findIndex((item) => {
            return item.value.toLowerCase() === a.category.toLowerCase();
          });
          const indexB = categoryData.findIndex((item) => {
            return item.value.toLowerCase() === b.category.toLowerCase();
          });


          return indexA - indexB;
        });
        break;
      case "Alphabetical":
        newItems?.sort((a, b) => (a.name < b.name ? -1 : 1));
        break;
      case "Price: Low to High":
        newItems?.sort((a, b) => (a.price < b.price ? -1 : 1));
        break;
      case "Price: High to Low":
        newItems?.sort((a, b) => (a.price > b.price ? -1 : 1));
        break;
      case "Last modified: Oldest to newest":
        break;
      case "Last modified: Newest to Oldest":
        newItems?.reverse();
        break;
      default:
        break;
    }
    setFilteredItems(newItems);
  }, [activeButton, sortOption, data?.menu]);

  return (
    <>
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
      <h4 className="current-filter-name mb-3">
        <span>{activeButton}</span>
        {filteredItems?.length > 0 && <small>({filteredItems?.length})</small>}
      </h4>
      <MenuItemModal
        mode={mode}
        show={showModal}
        onHide={handleHideModal}
        socket={socket}
        {...(itemToEdit !== null ? { defaultData: itemToEdit } : {})}
      />

      <DeleteItemModal
        show={showDeleteModal}
        onHide={handleHideDeleteModal}
        item={itemToDelete}
      />

      <section className="bg-white light-bx-shadow box">
        <Pagination
          itemsPerPage={8}
          itemList={filteredItems}
          onFilteredItems={setPaginationFilteredItems}
        />

        <div className="d-flex align-items-center gap-3 mb-4">
          <span>Sort by:</span>
          <Form.Select
            value={sortOption}
            name="sortOption"
            onChange={(e) => setSortOption(e.target.value)}
            className="menu-filter"
          >
            {selectOptions.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </div>

        <ul className="menu-list">
          {data === null ? (
            <>
              <DummyMenuItem ignore key={1} />
              <DummyMenuItem ignore key={2} />
              <DummyMenuItem ignore key={3} />
              <DummyMenuItem ignore key={4} />
              <DummyMenuItem ignore key={5} />
              <DummyMenuItem ignore key={6} />
            </>
          ) : paginationFilteredItems?.length > 0 ? (
            paginationFilteredItems.map((item, i) => (
              <MenuItem
                key={i}
                item={item}
                onShowEditModal={handleShowEditModal}
                onShowDeleteModal={handleShowDeleteModal}
                user={user}
              />
            ))
          ) : (
            <p>No results</p>
          )}
          {user?.roles[0] === "Admin" ? (
            <button
              className="action-button light-bx-shadow red-hover"
              onClick={handleShowNewModal}
            >
              New Menu Item
            </button>
          ) : null}
        </ul>
      </section>
    </>
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

function DeleteItemModal({ show, onHide, item }) {
  const { sendNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${environment.API_BASEURL}/menu/deleteMenuItem`, {
        item,
        restaurantName: "makoto", // TODO
      })
      .then(() => {
        sendNotification("info", `Deleted menu item ${item?.name}`);
        onHide();
      })
      .catch((error) => {
        console.log(error);
        sendNotification("error", error.message);
      });
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
          <Modal.Title>Delete Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete '{item?.name}'? This is permanent.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function MenuItem({ item, onShowEditModal, onShowDeleteModal, user }) {
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
      case "A La Carte":
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
      <div
        className="menu-item-img-container"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      ></div>
      <div className="menu-item-details">
        {user?.roles[0] === "Admin" ? (
          <div className="dropdown action-list">
            <button className="dropbtn">
              <i className="bx bx-dots-horizontal"></i>
            </button>
            <div className="dropdown-content">
              <button
                className="d-flex align-items-center justify-content-between gap-2"
                onClick={() => onShowEditModal(item)}
              >
                <span>Edit</span>
                <i className="bx bx-edit-alt"></i>
              </button>
              <button
                className="d-flex align-items-center justify-content-between gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  onShowDeleteModal(item);
                }}
              >
                <span>Delete</span>
                <i className="bx bx-trash"></i>
              </button>
            </div>
          </div>
        ) : null}

        <span className="menu-item-name">
          {item.name}{" "}
          {item.vegetarian && (
            <OverlayTrigger placement="top" overlay={VegetarianTooltip()}>
              <i className="bx bxs-leaf vegetarian-icon"></i>
            </OverlayTrigger>
          )}
        </span>
        <div className="d-flex align-items-center justify-content-between">
          <em>{item.category}</em>
          <strong className="menu-item-price">&#165;{item.price}</strong>
        </div>

        <div className="menu-item-datalists">
          {item.ingredients?.length > 0 && (
            <div className="dropdown">
              <button className="dropbtn font-size-sm d-flex align-items-center gap-1 light-bx-shadow">
                <span>Ingred.:</span>
                <i className="bx bx-chevron-down"></i>
              </button>
              <div className="dropdown-content">
                {item.ingredients.map((ingredient, i) => (
                  <span key={i}>{ingredient}</span>
                ))}
              </div>
            </div>
          )}
          {item.allergies?.length > 0 && (
            <div className="dropdown">
              <button className="dropbtn font-size-sm d-flex align-items-center gap-1 light-bx-shadow">
                <span>Allergies:</span>
                <i className="bx bx-chevron-down"></i>
              </button>
              <div className="dropdown-content">
                {item.allergies.map((allergy, i) => (
                  <span key={i}>{allergy}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
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
