import { useState, useEffect } from "react";
import OrderHistoryList from "../../components/OrderHistoryList";

export default function OrderHistory({ socket, data }) {
  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Order History</h2>
      </header>

      <OrderHistoryList />
    </main>
  );
}
