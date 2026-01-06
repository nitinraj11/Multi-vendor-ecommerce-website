import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import OrdersTable from "../components/OrdersTable";

const VendorDashboard = () => {
  const stats = [
    { title: "Products", value: 12 },
    { title: "Orders", value: 34 },
    { title: "Earnings", value: "$1,250" },
  ];

  return (p
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <h1>Vendor Dashboard</h1>

        <div className="stats">
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>

        <OrdersTable />
      </div>
    </div>
  );
};

export default VendorDashboard;
