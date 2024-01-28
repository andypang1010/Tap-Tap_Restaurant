import OrderHistoryList from "../../components/OrderHistoryList";
import PageTitle from "../../components/PageTitle";

export default function OrderHistory() {
  return (
    <main className="main-content">
      <header className="page-title">
        <PageTitle title="Order History" />
        <h2>Order History</h2>
      </header>

      <OrderHistoryList />
    </main>
  );
}
