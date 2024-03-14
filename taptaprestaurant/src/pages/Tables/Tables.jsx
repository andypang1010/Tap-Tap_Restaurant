import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./Tables.css";
import Pagination from "../../components/Pagination/Pagination";
import ActionBanner from "../../components/ActionBanner/ActionBanner";
import { useNotification } from "../../components/NotificationContext";
import { SocketContext } from "../../App";
import Header from "../../components/Header";
import axios from "axios";
import ElapsedTime from "../../components/ElapsedTime";

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
  restaurantName,
  tableName,
  sendNotification,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://taptap-414502.uw.r.appspot.com/pos/closeTableSession", {
        restaurantName: "makoto", // TODO
        tableName: tableName,
      })
      .then(() => {
        sendNotification("info", `Closed tab at table '${tableName}'`);
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
          <Modal.Title>Close Tab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to close the tab at table '
            <em>{tableName}</em>'?
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

function CancelItemModal({
  show,
  onHide,
  restaurantName,
  tableName,
  sendNotification,
  orderIds,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(restaurantName, tableName);

    axios
      .post("https://taptap-414502.uw.r.appspot.com/pos/cancelOrders", {
        restaurantName: "makoto", // TODO
        tableName,
        orderIds,
      })
      .then(() => {
        sendNotification("info", `Canceled order at table '${tableName}'`);
        onHide();
      })
      .catch((error) => {
        console.log(error);
        sendNotification("error", error.message);
      });
  };

  useEffect(() => {
    console.log(orderIds);
  }, [orderIds]);

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
            Are you sure you want to cancel item '<em>{orderIds[0]}</em>' at
            Table '<em>{tableName}</em>'?
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
  const [showCancelOrdersModal, setShowCancelOrdersModal] = useState(false);
  const [ordersToCancel, setOrdersToCancel] = useState({
    orderIds: [],
    tableName: "",
  });
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

  const handleShowCancelOrdersModal = (orderIds, tableName) => {
    setShowCancelOrdersModal(true);
    setOrdersToCancel({
      orderIds,
      tableName,
    });
  };

  const handleHideCancelOrdersModal = () => {
    setShowCancelOrdersModal(false);
    setOrdersToCancel({
      orderIds: [],
      tableName: "",
    });
  };

  useEffect(() => {
    const visibility = tableVisibility;
    Object.entries(data?.tables || {}).forEach(([name, data]) => {
      visibility[name] = data.sessionActive;
    });
    setTableVisibility(visibility);
  }, [data?.tables]);

  useEffect(() => {
    console.log(
      data?.tables,
      data?.tables.length,
      data?.tables["1"]?.tab[0]?.createdAt
    );
  }, [data?.tables]);

  return (
    <main className="main-content">
      <Header title="Tables" pageTitle="Tables" />

      <CloseTabModal
        show={showCloseModal}
        onHide={handleHideCloseModal}
        socket={socket}
        restaurantName={data?.username}
        tableName={tabToClose}
        sendNotification={sendNotification}
      />

      <CancelItemModal
        show={showCancelOrdersModal}
        onHide={handleHideCancelOrdersModal}
        restaurantName={data?.username}
        tableName={ordersToCancel?.tableName}
        orderIds={ordersToCancel?.orderIds}
        sendNotification={sendNotification}
      />

      <section>
        <ul className="table-list-banner">
          {Object.entries(data?.tables || {}).map(([name, data], i) => {
            return (
              <TableButton
                key={i}
                name={name}
                sessionActive={data.sessionActive}
                isActive={tableVisibility[name]}
                onToggleTable={handleToggleTable}
              />
            );
          })}
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
                  onCancelItem={handleShowCancelOrdersModal}
                  sessionActive={data.sessionActive}
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

function TableButton({ sessionActive, name, onToggleTable, isActive }) {
  return (
    <button
      className={`table-button ${
        isActive
          ? ""
          : sessionActive
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

function Table({
  tab,
  name,
  onCloseTab,
  onCancelItem,
  sessionActive,
  isActive,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const totalPrice = tab?.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );

  const handleToggleItem = (orderId) => {
    const updatedSelectedItems = [...selectedItems];

    const index = updatedSelectedItems.indexOf(orderId);

    index === -1
      ? updatedSelectedItems.push(orderId)
      : updatedSelectedItems.splice(index, 1);

    setSelectedItems(updatedSelectedItems);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [filteredItems]);

  return (
    <fieldset
      className={`tab box ${!sessionActive ? "empty-tab" : ""} ${
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
        <ActionBanner
          selectedItems={selectedItems}
          onDelete={() => onCancelItem(selectedItems, name)}
        />
        <span>Item</span>
        <span>#</span>
        <span>Elapsed Time</span>
        <span>Status</span>
        {/*<span>Customer</span>
        <span>Total</span>*/}
        <span>Tendered</span>
      </div>

      <TableItemList
        items={filteredItems}
        selectedItems={selectedItems}
        onToggleItem={handleToggleItem}
      />

      <footer className="table-footer">
        <span className="table-total">Grand Total:</span>
        <strong>&yen; {totalPrice}</strong>
      </footer>
    </fieldset>
  );
}

function TableItemList({ items, selectedItems, onToggleItem, onCancelItem }) {
  return (
    <ul className="item-list">
      {items?.length > 0 ? (
        items?.map((item, i) => {
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
                  checked={selectedItems.includes(item.orderId)}
                  onChange={() => onToggleItem(item.orderId)}
                  disabled={item.tendered}
                />
                <strong className="item-name">{item.item.name}</strong>
              </label>
              <div className="item-quantity">
                <small>&#x2715;</small>
                <span>{item.quantity}</span>
              </div>
              <ElapsedTime startTime={item.createdAt} />
              <div className={`status-badge ${statusClass}`}>{item.status}</div>
              {/*<div className="item-customer-name">
                <em>{item.customerName}</em>
              </div>
              <div className="item-price">
                <span>&yen;</span>
                <strong>{item.item.price * item.quantity}</strong>
          </div>*/}
              <div className="item-tendered">
                {item.tendered ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                ) : null}
              </div>
              {item.tendered ? null : (
                <div className="item-delete-button">
                  <button onClick={() => onCancelItem([item.orderId], name)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              )}

              {item.specialInstructions !== "None" ? (
                <em className="item-special-instructions">
                  {item.specialInstructions}
                </em>
              ) : null}
            </li>
          );
        })
      ) : (
        <p>No results</p>
      )}
    </ul>
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
