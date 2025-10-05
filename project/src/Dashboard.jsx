import React from "react";
import SpendingBreakdownCard, { sumLowValues } from "./components/SpendingBreakdownCard";



export default function Dashboard({ monthWeeks = {}, weekEvents = [], loadingMonth = false, amountToSpend = 0 }) {
  // monthWeeks: { weekNum: [events] }

  const [week1SliderValues, setWeek1SliderValues] = React.useState(
    monthWeeks["1"] ? monthWeeks["1"].map(() => 1) : []
  );
  // Other weeks state
  const [sliderStates, setSliderStates] = React.useState(() => {
    const states = {};
    Object.keys(monthWeeks).forEach(weekNum => {
      states[weekNum] = monthWeeks[weekNum].map(() => 1);
    });
    return states;
  });

  // Re-sync sliderStates when monthWeeks changes
  React.useEffect(() => {
    // Only update week1SliderValues if changed
    if (monthWeeks["1"]) {
      const newWeek1 = monthWeeks["1"].map(() => 1);
      if (JSON.stringify(newWeek1) !== JSON.stringify(week1SliderValues)) {
        setWeek1SliderValues(newWeek1);
      }
    }
    // Only update sliderStates if changed
    const states = {};
    Object.keys(monthWeeks).forEach(weekNum => {
      if (weekNum === "1") return;
      states[weekNum] = monthWeeks[weekNum].map(() => 1);
    });
    if (JSON.stringify(states) !== JSON.stringify(sliderStates)) {
      setSliderStates(states);
    }
  }, [monthWeeks]);

  // Calculate totals for each week
  const weekTotals = {};
  Object.keys(monthWeeks).forEach(weekNum => {
    weekTotals[weekNum] = monthWeeks[weekNum].reduce((acc, event, idx) => {
      const low = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
      const medium = Number((event?.medium || '').replace(/[^0-9.]/g, '')) || 0;
      const high = Number((event?.high || '').replace(/[^0-9.]/g, '')) || 0;
      const priceValues = [0, low, medium, high];
      let sliderIdx;
      if (weekNum === "1") {
        sliderIdx = typeof week1SliderValues[idx] === 'number' ? week1SliderValues[idx] : 1;
      } else {
        sliderIdx = typeof sliderStates[weekNum]?.[idx] === 'number' ? sliderStates[weekNum][idx] : 1;
      }
      return acc + priceValues[sliderIdx];
    }, 0);
  });

  // Calculate monthly total as sum of weekTotals
  const monthTotal = Object.values(weekTotals).reduce((acc, val) => acc + val, 0);

  // Calculate 4 month totals
  const fourMonthTotals = [0, 1, 2, 3].map(monthOffset => {
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() + monthOffset);
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthStart.getMonth() + 1);
    let total = 0;
    Object.values(monthWeeks).forEach(eventsArr => {
      eventsArr.forEach(ev => {
        let startDate = ev.start;
        if (startDate && typeof startDate === 'object' && startDate.dateTime) {
          startDate = startDate.dateTime;
        } else if (startDate && typeof startDate === 'object' && startDate.date) {
          startDate = startDate.date;
        }
        const d = new Date(startDate);
        if (d >= monthStart && d < monthEnd) {
          const low = Number((ev.low || '').replace(/[^0-9.]/g, '')) || 0;
          const medium = Number((ev.medium || '').replace(/[^0-9.]/g, '')) || 0;
          const high = Number((ev.high || '').replace(/[^0-9.]/g, '')) || 0;
          const priceValues = [0, low, medium, high];
          // Use slider value if available, else default to 1
          let sliderIdx = 1;
          // Find weekNum for this event
          const weekNum = Object.keys(monthWeeks).find(wn => monthWeeks[wn].includes(ev));
          if (weekNum) {
            const idx = monthWeeks[weekNum].indexOf(ev);
            sliderIdx = weekNum === "1"
              ? (typeof week1SliderValues[idx] === 'number' ? week1SliderValues[idx] : 1)
              : (typeof sliderStates[weekNum]?.[idx] === 'number' ? sliderStates[weekNum][idx] : 1);
          }
          total += priceValues[sliderIdx];
        }
      });
    });
    return total;
  });

  // Handler for slider change in week 1
  const handleWeek1SliderChange = (eventIdx, value) => {
    setWeek1SliderValues(prev => {
      const updated = [...prev];
      updated[eventIdx] = value;
      return updated;
    });
  };
  // Handler for slider change in other weeks
  const handleSliderChange = (weekNum, eventIdx, value) => {
    setSliderStates(prev => {
      const updated = { ...prev };
      updated[weekNum] = [...updated[weekNum]];
      updated[weekNum][eventIdx] = value;
      return updated;
    });
  };
  // 1 week breakdown uses week 1 state and events
  const weekTotal = monthWeeks["1"] ? monthWeeks["1"].reduce((acc, event, idx) => {
  const low = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
  const medium = Number((event?.medium || '').replace(/[^0-9.]/g, '')) || 0;
  const high = Number((event?.high || '').replace(/[^0-9.]/g, '')) || 0;
  const priceValues = [0, low, medium, high];
  const sliderIdx = typeof week1SliderValues[idx] === 'number' ? week1SliderValues[idx] : 1;
  return acc + priceValues[sliderIdx];
  }, 0) : 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>1 Week Breakdown</h2>
      <SpendingBreakdownCard
        title={`1 Week: $${weekTotal}/${amountToSpend}`}
        events={monthWeeks["1"] || []}
        loading={loadingMonth}
        sliderValues={week1SliderValues}
        onSliderChange={handleWeek1SliderChange}
      />
      <h2>Monthly Spending Summary</h2>
      <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Month Total: ${monthTotal}/{amountToSpend}</h3>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {Object.keys(monthWeeks).map(weekNum => (
          <div key={weekNum} style={{ flex: '1 1 300px', minWidth: 300 }}>
            <SpendingBreakdownCard
              title={`Week ${weekNum}: $${weekTotals[weekNum]}/${amountToSpend}`}
              events={monthWeeks[weekNum]}
              loading={loadingMonth}
              sliderValues={weekNum === "1" ? week1SliderValues : sliderStates[weekNum]}
              onSliderChange={weekNum === "1"
                ? handleWeek1SliderChange
                : (eventIdx, value) => handleSliderChange(weekNum, eventIdx, value)
              }
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', width: '80%', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)", borderRadius: "8px", padding: "1rem", background: "#fff" }}>
          <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Semester Summary</h2>
          <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>4 Month Totals</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {fourMonthTotals.map((total, i) => (
              <li key={i} style={{ marginBottom: '0.5em', fontSize: '1.1em' }}>
                Month {i + 1}: ${total}/{amountToSpend}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
