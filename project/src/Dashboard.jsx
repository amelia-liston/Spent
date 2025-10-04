
import React from "react";
import SpendingBreakdownCard from "./components/SpendingBreakdownCard";


export default function Dashboard({ weekEvents = [], loadingWeek = false }) {
  // Defensive checks
  const safeWeekEvents = Array.isArray(weekEvents) ? weekEvents : [];
  const safeLoadingWeek = typeof loadingWeek === 'boolean' ? loadingWeek : false;

    return (
    <div>
      <h1>Dashboard</h1>
      <p>View your spending breakdown for the next week, month, and 4 months.</p>
      <h2>Estimated Spending</h2>
      <SpendingBreakdownCard title="1 Week" events={safeWeekEvents} loading={safeLoadingWeek} />
      <SpendingBreakdownCard title="1 Month" />
      <SpendingBreakdownCard title="4 Months" />
    </div>
  );
  }
