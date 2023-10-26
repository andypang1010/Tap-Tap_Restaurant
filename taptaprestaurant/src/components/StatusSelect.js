import { useState } from "react";
import EditIcon from "./EditIcon";

const selectData = [
  {
    text: "Order Placed",
    value: "order-placed",
  },
  {
    text: "Order Prepared",
    value: "order-prepared",
  },
  {
    text: "Order Delivered",
    value: "order-delivered",
  },
  {
    text: "Payment Completed",
    value: "payment-completed",
  },
  {
    text: "Payment Failed",
    value: "payment-failed",
  },
];

function statusToValue(status) {
  for (var item of selectData) if (item.text === status) return item.value;
  return "";
}

export default function StatusSelect({ onChange = () => {}, menuItem }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <div className="edit-container">
      <select defaultValue="default" name="type" onChange={onChange}>
        <option value="default" disabled hidden>
          Choose...
        </option>
        {selectData.map((item, i) => (
          <option className={item.value} key={i} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setIsEditing(false);
        }}
      >
        <i className="bx bx-x text-danger"></i>
      </button>
    </div>
  ) : (
    <div
      className={`d-flex align-items-center gap-2 ${statusToValue(
        menuItem.status
      )}`}
    >
      <span>{menuItem.status}</span>
      <EditIcon
        onClick={() => {
          setIsEditing(true);
        }}
      />
    </div>
  );
}
