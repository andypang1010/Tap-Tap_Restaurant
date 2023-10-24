import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import "./Menu.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

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

export default function Menu({ socket }) {
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

      <MenuBox data={data} onMenuUpdate={handleMenuUpdate} />
    </main>
  );
}

function MenuBox({ data, onMenuUpdate }) {
  const [activeButton, setActiveButton] = useState("All");
  const filteredItems =
    (data !== null &&
      data.menu.filter(
        (item) =>
          item.type.toLowerCase() === activeButton.toLowerCase() ||
          activeButton === "All"
      )) ||
    [];

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <section className="menu-box box">
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
      <h2 className="current-filter-name">{activeButton}</h2>
      <ul className="menu-list">
        {data === null ? (
          <li>
            <h4>Loading...</h4>
          </li>
        ) : filteredItems.length === 0 ? (
          <li>
            <h4>No items matching this filter</h4>
          </li>
        ) : (
          filteredItems.map((item) => (
            <MenuItem item={item} onUpdate={onMenuUpdate} />
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
    <li key={item.name} className={`menu-item-box ${border}`}>
      <h5 className="menu-item-name">{item.name}</h5>
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
            <i className="bx bxs-info-circle text-danger"></i>
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
