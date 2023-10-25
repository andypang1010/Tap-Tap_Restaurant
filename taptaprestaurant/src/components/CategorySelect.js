import { Form } from "react-bootstrap";

const selectData = [
  {
    value: "Course",
  },
  {
    value: "Sushi",
  },
  {
    value: "Sashimi",
  },
  {
    value: "Grilled Dishes",
  },
  {
    value: "Boiled Dishes",
  },
  {
    value: "Beer",
  },
  {
    value: "Sake",
  },
  {
    value: "Spirits",
  },
  {
    value: "Soft Drink",
  },
  {
    value: "Tea",
  },
];

export default function CategorySelect({ onChange }) {
  return (
    <Form.Select defaultValue="default" name="category" onChange={onChange}>
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
