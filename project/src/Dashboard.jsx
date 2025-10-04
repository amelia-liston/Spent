
import React from "react";
import SpendingBreakdownCard, { sumLowValues } from "./components/SpendingBreakdownCard";



export default function Dashboard({ weekEvents = [], loadingWeek = false }) {
  // Defensive checks
  const safeWeekEvents = Array.isArray(weekEvents) ? weekEvents : [];
  const safeLoadingWeek = typeof loadingWeek === 'boolean' ? loadingWeek : false;

  // State for all slider values, one per event
  const [sliderValues, setSliderValues] = React.useState(
    safeWeekEvents.map(() => 1) // default to 'low' for each event
  );

  // Update slider value for a specific event
  const handleSliderChange = (eventIdx, value) => {
    setSliderValues((prev) => {
      const updated = [...prev];
      updated[eventIdx] = value;
      return updated;
    });
  };

  // Calculate week total based on current slider values
  const weekTotal = safeWeekEvents.reduce((acc, event, idx) => {
    const low = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
    const medium = Number((event?.medium || '').replace(/[^0-9.]/g, '')) || 0;
    const high = Number((event?.high || '').replace(/[^0-9.]/g, '')) || 0;
    const priceValues = [0, low, medium, high];
    return acc + priceValues[sliderValues[idx] || 1];
  }, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>View your spending breakdown for the next week, month, and 4 months.</p>
      <h2>Estimated Spending</h2>
      <SpendingBreakdownCard
        title={`1 Week: $${weekTotal}`}
        events={safeWeekEvents}
        loading={safeLoadingWeek}
        sliderValues={sliderValues}
        onSliderChange={handleSliderChange}
      />
      <SpendingBreakdownCard title="1 Month" />
      <SpendingBreakdownCard title="4 Months" />
    </div>
  );
}
