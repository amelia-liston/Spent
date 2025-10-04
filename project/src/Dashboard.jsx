import React from "react";

export default function Dashboard() {
  const cardStyle = {
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
    background: "#fff",
    maxWidth: "400px"
  };
  const columnsStyle = {
    display: "flex",
    justifyContent: "space-between"
  };
  const columnStyle = {
    width: "48%"
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <h2>Estimated Spending</h2>
      <div style={cardStyle}>
        <h3>1 week</h3>
        <div style={columnsStyle}>
          <div style={columnStyle}>
            <p>Placeholder text 1A</p>
            <p>Placeholder text 1B</p>
          </div>
          <div style={columnStyle}>
            <p>Placeholder text 1C</p>
            <p>Placeholder text 1D</p>
          </div>
        </div>
      </div>
      <div style={cardStyle}>
        <h3>1 Month</h3>
        <div style={columnsStyle}>
          <div style={columnStyle}>
            <p>Placeholder text 2A</p>
            <p>Placeholder text 2B</p>
          </div>
          <div style={columnStyle}>
            <p>Placeholder text 2C</p>
            <p>Placeholder text 2D</p>
          </div>
        </div>
      </div>
      <div style={cardStyle}>
        <h3>4 months</h3>
        <div style={columnsStyle}>
          <div style={columnStyle}>
            <p>Placeholder text 3A</p>
            <p>Placeholder text 3B</p>
          </div>
          <div style={columnStyle}>
            <p>Placeholder text 3C</p>
            <p>Placeholder text 3D</p>
          </div>
        </div>
      </div>
    </div>
  );
}
