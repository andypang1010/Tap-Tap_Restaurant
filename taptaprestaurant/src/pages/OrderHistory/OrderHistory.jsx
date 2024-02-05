import Header from "../../components/Header";
import OrderHistoryList from "../../components/OrderHistoryList";

export default function OrderHistory() {
  return (
    <main className="main-content">
      <Header title="Order History" pageTitle="Order History" />

      <OrderHistoryList />
    </main>
  );
}
