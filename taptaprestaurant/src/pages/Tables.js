import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import { Form } from "react-bootstrap";
import StatusSelect from "../components/StatusSelect";

export default function Tables({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    data !== null && (document.title = `${data.name} Tables`);
    console.log(data);
  }, [data]);

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

      <div className="content-box box">
        <ul className="table-list">
          {data === null ? (
            <>
              <DummyTable key="1" />
              <DummyTable key="2" />
              <DummyTable key="3" />
            </>
          ) : (
            <>
              <Table tab={data.tables["1"]} name={"1"} />
              <Table tab={data.tables["2"]} name={"2"} />
            </>
          )}
        </ul>
      </div>
    </main>
  );
}

function Table({ tab, name }) {
  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <li className="table box">
      <h4>#{name}</h4>
      <ul className="item-list">
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
                    <div className="item-special_instructions">
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
      </ul>
    </li>
  );
}

function DummyTable() {
  return (
    <li className="table dummy-table box">
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
