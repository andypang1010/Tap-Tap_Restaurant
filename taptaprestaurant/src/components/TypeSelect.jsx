import { Form } from "react-bootstrap";

const selectData = [
  {
    value: "Course",
  },
  {
    value: "Main",
  },
  {
    value: "Appetizer",
  },
  {
    value: "A La Carte",
  },
  {
    value: "Dessert",
  },
  {
    value: "Breakfast",
  },
  {
    value: "Lunch",
  },
  {
    value: "Dinner",
  },
  {
    value: "Alcohol",
  },
  {
    value: "Beverage",
  },
];

export default function TypeSelect({ val, onChange }) {
  return (
    <Form.Select
      value={val === "" ? "default" : val}
      name="type"
      onChange={onChange}
      className="select"
    >
      <option value="default" disabled hidden>
        Choose...
      </option>
      {selectData.map((item, i) => (
        <option key={i} value={item.value}>
          {item.value}
        </option>
      ))}
    </Form.Select>
  );
}
