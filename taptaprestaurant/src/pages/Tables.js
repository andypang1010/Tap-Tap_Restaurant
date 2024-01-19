import { useState, useEffect } from "react";
import io from "socket.io-client";
import RestaurantDataListener from "../components/RestaurantDataListener";
import "./Tables.css";
import {
  Button,
  Modal,
  Form,
} from "react-bootstrap";

const tempTableData = [
  {
    item: {
      name: "White Wine",
      price: 800,
      available: true
    },
    quantity: 4,
    special_instructions: null,
    status: "Tendered",
    customer_name: "Avery"
  },
  {
    item: {
      name: "Whitefish Usuzukuri",
      price: 3000,
      available: true
    },
    quantity: 4,
    special_instructions: null,
    status: "Placed",
    customer_name: "Avery"
  },
  {
    item: {
      name: "Sake",
      price: 600,
      available: true
    },
    quantity: 4,
    special_instructions: null,
    status: "Tendered",
    customer_name: "Jeff"
  },
  {
    item: {
      name: "Avery Special",
      price: 2000,
      available: true
    },
    quantity: 4,
    special_instructions: null,
    status: "Error",
    customer_name: "Andy"
  }
]

function CloseTabModal({ show, onHide, socket, restaurantName, tabName }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit("closeTab", {
        restaurantName,
        table: tabName,
      });

      socket.on("success", (newData) => {
        console.log("newdata: ", newData);
      });

      socket.on("error", (error) => {
        console.log("error: ", error);
      });
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Close Tab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to close tab '{tabName}'?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button className="submit-button" variant="delete" type="submit">
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Tables({ socket = io("http://localhost:8008") }) {
  const [data, setData] = useState(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [tabToClose, setTabToClose] = useState("");

  useEffect(() => {
    data !== null && (document.title = `${data.name} Tables`);
    console.log(data);
  }, [data]);

  const handleShowCloseModal = (name) => {
    setShowCloseModal(true);
    setTabToClose(name);
  }

  const handleHideCloseModal = () => {
    setShowCloseModal(false);
    setTabToClose("");
  }

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Tables</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      <CloseTabModal 
        show={showCloseModal}
        onHide={handleHideCloseModal}
        socket={socket}
        restaurantName={data?.username}
        tabName={tabToClose}
      />

      <section>
        <ul className="table-list">
          {data === null ? (
            <>
              {/*<DummyTable key="1" />
              <DummyTable key="2" />
          <DummyTable key="3" />*/}
            </>
          ) : (
            <Table key={1} tab={tempTableData} name={"1"} onCloseTab={handleShowCloseModal} />
            /*Object.entries(data.tables).map(([name,tab], i) => 
              <Table key={i} tab={tab} name={name} onCloseTab={handleShowCloseModal} />)*/
          )}
        </ul>
      </section>
    </main>
  );
}

function Table({ tab, name, onCloseTab }) {
  const totalPrice = tab?.reduce((total, item) => total + item.item.price, 0);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <li className="tab box">
      <header className="table-header">
        <span className="table-name">#{name}</span>
        <ul className="button-list">
          <button className="circle-button close-tab-button" onClick={() => onCloseTab(name)}>
            <i class="bx bx-window-close"></i>
          </button>
        </ul>
      </header>

      <ul className="item-list">
        {tab &&
          tab.map((item, i) => {
            let statusClass;

            switch (item.status) {
              case "Placed":
                statusClass = "order-placed";
                break;
              case "Prepared":
                statusClass = "order-prepared";
                break;
              case "Delivered":
                statusClass = "order-delivered";
                break;
              case "Tendered":
                statusClass = "order-tendered";
                break;
              case "Error":
                statusClass = "order-error";
                break;
              default:
                statusClass = "";
            }
          
            return (
              <li className="item" key={i}>
                <input className="item-check" type="checkbox" />
                <div className="item-name">{item.item.name}</div>
                <div className="item-quantity">&#x2715; {item.quantity}</div>
                <div className={`item-status ${statusClass}`}>{item.status}</div>
                <div className="item-customer-name"><em>{item.customer_name}</em></div>
                <div className="item-price"><strong>&yen; {item.item.price}</strong></div>
                {item.special_instructions !== "None" ? (
                  <em className="item-special-instructions">
                    {item.special_instructions}
                  </em>
                ) : null}
              </li>
            )
          })}
      </ul>

      <footer className="table-footer">
        <span className="table-total">Grand Total:</span>
        <strong>&yen; {totalPrice}</strong>
      </footer>
    </li>
  );
}

/*<ul className="item-list">
        {tab &&
          tab.map((item, i) => (
            <li className="item" key={i}>
              <div className="item-info">
                <div className="item-description">
                  <p>{item.item.name}</p>
                  <span className="item-quantity">
                    <em>Quantity: {item.quantity}</em>
                  </span>
                </div>
                <div className="item-status">
                  <StatusSelect menuItem={item} />
                </div>
                {item.special_instructions !== "None" &&
                  item.special_instructions !== "" && (
                    <div className="item-special-instructions">
                      <span>
                        <strong className="text-danger">
                          Special Instructions:
                        </strong>{" "}
                        {item.special_instructions}
                      </span>
                    </div>
                  )}
                <span className="item-price">
                  &#165;{parseInt(item.item.price) * parseInt(item.quantity)}
                </span>
              </div>
            </li>
          ))}
      </ul>*/

function DummyTable() {
  return (
    <li className="table dummy-table dummy-container box">
      <h4 className="dummy">##</h4>
      <ul className="item-list">
        <DummyTableItem key="1" />
        <DummyTableItem key="2" />
        <DummyTableItem key="3" />
      </ul>
    </li>
  );
}

function DummyTableItem() {
  return (
    <li className="item">
      <div className="item-info">
        <div className="item-description">
          <p className="dummy">Item Name------</p>
          <span className="item-quantity">
            <span className="dummy">Quantity---</span>
          </span>
        </div>
        <span className="item-price">
          <small className="dummy">Price</small>
        </span>
      </div>
    </li>
  );
}