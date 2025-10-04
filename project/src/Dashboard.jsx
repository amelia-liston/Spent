import React from "react";
import SpendingBreakdownCard from "./components/SpendingBreakdownCard";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <h2>Estimated Spending</h2>
    <SpendingBreakdownCard title="1 Week"/>
    <SpendingBreakdownCard title="1 Month"/>
    <SpendingBreakdownCard title="4 Months"/>
    </div>
  );
}
