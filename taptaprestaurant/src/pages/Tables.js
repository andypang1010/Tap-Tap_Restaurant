import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
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

      <section>
        <ul className="table-list">
          {data === null ? (
            <>
              {/*<DummyTable key="1" />
              <DummyTable key="2" />
          <DummyTable key="3" />*/}
            </>
          ) : (
            <>
              <Table tab={data.tables["1"]} name={"1"} />
              <Table tab={data.tables["2"]} name={"2"} />
            </>
          )}
        </ul>
      </section>
    </main>
  );
}

function Table({ tab, name }) {
  const totalPrice = tab.reduce((total, item) => total + item.item.price, 0);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <li className="tab box">
      <header className="table-header">
        <span className="table-name">#{name}</span>
        <ul className="button-list">
          <button className="circle-button close-tab-button">
            <i class="bx bx-window-close"></i>
          </button>
        </ul>
      </header>

      <ul className="item-list">
        {tab &&
          tab.map((item, i) => (
            <li className="item" key={i}>
              <div className="item-name">{item.item.name}</div>
              <div className="item-quantity">&#x2715; {item.quantity}</div>
              <div className="item-status">{item.status}</div>
              <div className="item-price">&yen; {item.item.price}</div>
              {item.special_instructions !== "None" ? (
                <em className="item-special-instructions">
                  {item.special_instructions}
                </em>
              ) : null}
            </li>
          ))}
      </ul>

      <footer className="table-footer">
        <span className="table-total">Grand Total:</span>
        <span>&yen; {totalPrice}</span>
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
