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

export default function TypeSelect({ onChange }) {
  return (
    <Form.Select name="type" onChange={onChange}>
      <option disabled selected hidden>
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
