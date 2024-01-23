import { useState } from "react";
import "./Tables.css";
import { Button, Modal, Form, Tooltip, OverlayTrigger } from "react-bootstrap";

const tempTableData = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  "Bar 1": {},
  "Bar 2": {},
  "Bar 3": {},
};

const tempTabData = [
  {
    item: {
      name: "White Wine",
      price: 800,
      available: true,
    },
    quantity: 4,
    special_instructions: null,
    status: "Placed",
    customer_name: "Avery",
  },
  {
    item: {
      name: "Whitefish Usuzukuri",
      price: 3000,
      available: true,
    },
    quantity: 4,
    special_instructions: null,
    status: "Placed",
    customer_name: "Avery",
  },
  {
    item: {
      name: "Sake",
      price: 600,
      available: true,
    },
    quantity: 4,
    special_instructions: null,
    status: "Tendered",
    customer_name: "Jeff",
  },
  {
    item: {
      name: "Avery Special",
      price: 2000,
      available: true,
    },
    quantity: 4,
    special_instructions: null,
    status: "Error",
    customer_name: "Andy",
  },
];

function CloseTabTooltip() {
  return (
    <Tooltip>
      <strong>Close Tab</strong>
    </Tooltip>
  );
}

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
          <Modal.Title>Close Tab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to close tab '{tabName}'?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="danger" type="submit">
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Tables({ socket, data }) {
  //const [data, setData] = useState(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [tabToClose, setTabToClose] = useState("");

  const handleShowCloseModal = (name) => {
    setShowCloseModal(true);
    setTabToClose(name);
  };

  const handleHideCloseModal = () => {
    setShowCloseModal(false);
    setTabToClose("");
  };

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Tables</h2>
      </header>

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
            Object.entries(tempTableData).map(([name, tab], i) => (
              <Table
                key={i}
                tab={tempTabData}
                name={name}
                onCloseTab={handleShowCloseModal}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

function Table({ tab, name, onCloseTab }) {
  const totalPrice = tab?.reduce((total, item) => total + item.item.price, 0);

  return (
    <fieldset className="tab box">
      <legend className="light-bx-shadow">{name}</legend>
      <header className="table-header">
        <ul className="button-list">
          <OverlayTrigger placement="top" overlay={CloseTabTooltip()}>
            <button
              className="circle-button close-tab-button"
              onClick={() => onCloseTab(name)}
            >
              <i className="bx bx-window-close"></i>
            </button>
          </OverlayTrigger>
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
                <label className="item-label">
                  <input className="item-check" type="checkbox" />
                  <div className="item-name">{item.item.name}</div>
                </label>
                <div className="item-quantity">
                  <small>&#x2715;</small>
                  <span>{item.quantity}</span>
                </div>
                <div className={`status-badge ${statusClass}`}>
                  {item.status}
                </div>
                <div className="item-customer-name">
                  <em>{item.customer_name}</em>
                </div>
                <div className="item-price">
                  <span>&yen;</span>
                  <strong>{item.item.price}</strong>
                </div>
                {item.special_instructions !== "None" ? (
                  <em className="item-special-instructions">
                    {item.special_instructions}
                  </em>
                ) : null}
              </li>
            );
          })}
      </ul>

      <footer className="table-footer">
        <span className="table-total">Grand Total:</span>
        <strong>&yen; {totalPrice}</strong>
      </footer>
    </fieldset>
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
