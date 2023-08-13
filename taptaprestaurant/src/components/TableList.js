import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const tempTableData = [
  [
    { quantity: 2, item: { name: "Tonkatsu Ramen", description: "Oishii" } },
    {
      quantity: 1,
      item: { name: "Coca Cola", description: "Classic crispy taste" },
    },
  ],
  [
    { quantity: 4, item: { name: "Tonkatsu Ramen", description: "Oishii" } },
    {
      quantity: 1,
      item: { name: "Dr. Pepper", description: "A tangy fan favorite" },
    },
  ],
];

export default function TableList() {
  const [tableData, setTableData] = useState(tempTableData);
  const socket = io("http://localhost:8008");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {tableData.map((_, i) => (
            <th>
              <h3>#{i + 1}</h3>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tableData.map((item) => (
            <td>
              <TableBox />
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}

function TableBox() {
  return <div className="box">Hello</div>;
}
