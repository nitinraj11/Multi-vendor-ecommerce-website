const DashboardCards = () => {
  const stats = [
    { title: "Total Products", value: 24 },
    { title: "Total Orders", value: 120 },
    { title: "Total Earnings", value: "$2,450" },
    { title: "Pending Orders", value: 8 },
  ];

  return (
    <div className="cards">
      {stats.map((item, index) => (
        <div className="card" key={index}>
          <h4>{item.title}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
