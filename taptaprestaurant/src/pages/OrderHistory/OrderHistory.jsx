import { useContext, useState } from "react";
import Header from "../../components/Header";
import { AuthContext, SocketContext } from "../../App";
import Accordion from "react-bootstrap/Accordion";
import "./OrderHistory.css";
import Pagination from "../../components/Pagination/Pagination";
import Unauthorized from "../../components/Unauthorized";

export default function OrderHistory() {
  const { data } = useContext(SocketContext);
  const { authenticated } = useContext(AuthContext);

  return (
    <main className="main-content">
      <Header title="Order History" pageTitle="Order History" />

      {authenticated ? (
        <OrderHistoryList history={data?.orderHistory} />
      ) : (
        <Unauthorized />
      )}
    </main>
  );
}

function OrderHistoryList({ history }) {
  const [filteredItems, setFilteredItems] = useState(null);

  return (
    <>
      <Pagination
        itemsPerPage={10}
        itemList={history?.reverse()}
        onFilteredItems={setFilteredItems}
      />
      <Accordion>
        {filteredItems?.map((item, i) => (
          <Accordion.Item eventKey={i - 1 + ""} key={i}>
            <Accordion.Header>
              <div className="order-history-item">
                <span className="mono">
                  {new Date(item.finishedAt).toLocaleString()}
                </span>
                <span>{item.paymentId}</span>
                <span className="d-flex align-items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                    />
                  </svg>
                  <span>{item.tableName}</span>
                </span>
                <strong className="text-right mr-3">
                  &yen;{" "}
                  {item.items.reduce(
                    (total, item) => total + item.item.price * item.quantity,
                    0
                  )}
                </strong>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {item.items?.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

function Item({ item }) {
  return (
    <li className="order-item">
      <strong className="item-name">{item.item.name}</strong>
      <div className="item-quantity">
        <small>&#x2715;</small>
        <span>{item.quantity}</span>
      </div>
      <div className="item-customer-name">
        <em>{item.customerName}</em>
      </div>
      <div className="item-price">
        <span>&yen;</span>
        <strong>{item.item.price * item.quantity}</strong>
      </div>
    </li>
  );
}
