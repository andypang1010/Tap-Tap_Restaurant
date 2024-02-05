import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./Tables.css";
import Pagination from "../../components/Pagination/Pagination";
import ActionBanner from "../../components/ActionBanner/ActionBanner";
import { useNotification } from "../../components/NotificationContext";
import { SocketContext } from "../../App";
import Header from "../../components/Header";

function CloseTabTooltip() {
  return (
    <Tooltip>
      <strong>Close Tab</strong>
    </Tooltip>
  );
}

function CloseTabModal({
  show,
  onHide,
  socket,
  restaurantName,
  tabName,
  sendNotification,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit("closeTab", {
        restaurantName,
        table: tabName,
      });

      socket.on("success", () => {
        sendNotification("info", `Closed tab at table '${tabName}'`);
      });

      socket.on("error", (error) => {
        console.log("error: ", error);
        sendNotification("error", error.message);
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

function CancelItemModal({
  show,
  onHide,
  socket,
  restaurantName,
  tabName,
  itemName,
  sendNotification,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit("cancelItem", {
        restaurantName,
        table: tabName,
        itemName,
      });

      socket.on("success", () => {
        sendNotification(
          "info",
          `Canceled item ${itemName} at table '${tabName}'`
        );
      });

      socket.on("error", (error) => {
        console.log("error: ", error);
        sendNotification("error", error.message);
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
          <Modal.Title>Cancel Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to cancel item '{itemName}' at Table '
            {tabName}'?
          </p>
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

export default function Tables() {
  const { sendNotification } = useNotification();
  const { socket, data } = useContext(SocketContext);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [tabToClose, setTabToClose] = useState("");
  const [showCancelItemModal, setShowCancelItemModal] = useState(false);
  const [itemToCancel, setItemToCancel] = useState(null);
  const [tableVisibility, setTableVisibility] = useState({});

  const handleToggleTable = (tableName) => {
    setTableVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      updatedVisibility[tableName] = !updatedVisibility[tableName];
      return updatedVisibility;
    });
  };

  const handleShowCloseModal = (tableName) => {
    setShowCloseModal(true);
    setTabToClose(tableName);
  };

  const handleHideCloseModal = () => {
    setShowCloseModal(false);
    setTabToClose("");
  };

  const handleShowCancelItemModal = (item, table) => {
    setShowCancelItemModal(true);
    setItemToCancel({
      item,
      table,
    });
  };

  const handleHideCancelItemModal = () => {
    setShowCancelItemModal(false);
    setItemToCancel(null);
  };

  useEffect(() => {
    Object.entries(data?.tables || {}).forEach(([name, data]) => {
      tableVisibility[name] = data.tab.length > 0;
    });
  }, [data?.tables]);

  useEffect(() => {
    console.log(data?.tables, data?.tables.length);
  }, [data?.tables]);

  return (
    <main className="main-content">
      <Header title="Tables" pageTitle="Tables" />

      <CloseTabModal
        show={showCloseModal}
        onHide={handleHideCloseModal}
        socket={socket}
        restaurantName={data?.username}
        tabName={tabToClose}
        sendNotification={sendNotification}
      />

      <CancelItemModal
        show={showCancelItemModal}
        onHide={handleHideCancelItemModal}
        socket={socket}
        restaurantName={data?.username}
        tabName={itemToCancel?.table}
        itemName={itemToCancel?.item}
        sendNotification={sendNotification}
      />

      <section>
        <ul className="table-list-banner">
          {Object.entries(data?.tables || {}).map(([name, data], i) => (
            <TableButton
              key={i}
              name={name}
              tabLength={data.tab.length}
              isActive={tableVisibility[name]}
              onToggleTable={handleToggleTable}
            />
          ))}
        </ul>

        <ul className="table-list">
          {data === null ? (
            <>
              {/*<DummyTable key="1" />
              <DummyTable key="2" />
          <DummyTable key="3" />*/}
            </>
          ) : (
            Object.entries(data.tables).map(([name, data], i) => {
              return (
                <Table
                  key={i}
                  tab={data.tab}
                  name={name}
                  onCloseTab={handleShowCloseModal}
                  onCancelItem={handleShowCancelItemModal}
                  isActive={tableVisibility[name]}
                />
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}

function TableButton({ tabLength, name, onToggleTable, isActive }) {
  return (
    <button
      className={`table-button ${
        isActive
          ? ""
          : tabLength > 0
          ? "inactive--tab-open"
          : "light-bx-shadow inactive-button"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onToggleTable(name);
      }}
    >
      <Form.Check
        className="pointer-events-none"
        type="checkbox"
        label={name}
        checked={isActive}
      />
    </button>
  );
}

function Table({ tab, name, onCloseTab, onCancelItem, isActive }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const totalPrice = tab?.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );

  const handleToggleItem = (itemName) => {
    const updatedSelectedItems = [...selectedItems];

    const index = updatedSelectedItems.indexOf(itemName);

    index === -1
      ? updatedSelectedItems.push(itemName)
      : updatedSelectedItems.splice(index, 1);

    setSelectedItems(updatedSelectedItems);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [filteredItems]);

  return (
    <fieldset
      className={`tab box ${tab?.length === 0 ? "empty-tab" : ""} ${
        isActive ? "" : "inactive"
      }`}
    >
      <legend className="light-bx-shadow">{name}</legend>
      <ul className="button-list">
        <OverlayTrigger placement="top" overlay={CloseTabTooltip()}>
          <button
            className="circle-button close-tab-button"
            onClick={() => onCloseTab(name)}
          >
            &#x2715;
          </button>
        </OverlayTrigger>
      </ul>

      <Pagination
        itemsPerPage={10}
        itemList={tab}
        onFilteredItems={setFilteredItems}
      />

      <div className="item-list-header">
        <ActionBanner selectedItems={selectedItems} />
        <span>Item</span>
        <span>#</span>
        <span>Status</span>
        <span>Customer</span>
        <span>Total</span>
        <span></span>
      </div>

      <ul className="item-list">
        {filteredItems?.length > 0 ? (
          filteredItems?.map((item, i) => {
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
                  <Form.Check
                    className="item-check"
                    type="checkbox"
                    checked={selectedItems.includes(item.item.name)}
                    onChange={() => handleToggleItem(item.item.name)}
                  />
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
                  <strong>{item.item.price * item.quantity}</strong>
                </div>
                <div className="item-delete-button">
                  <button onClick={() => onCancelItem(item.item.name, name)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
                {item.special_instructions !== "None" ? (
                  <em className="item-special-instructions">
                    {item.special_instructions}
                  </em>
                ) : null}
              </li>
            );
          })
        ) : (
          <p>No results</p>
        )}
      </ul>

      <footer className="table-footer">
        <span className="table-total">Grand Total:</span>
        <strong>&yen; {totalPrice}</strong>
      </footer>
    </fieldset>
  );
}

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
