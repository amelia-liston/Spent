// Child component for each event row
function SpendingBreakdownRow({ event, rowStyle, eventStyle, priceStyle, sliderStyle, sliderValue, onSliderChange, idx }: {
    event: { event_name: string; low: string; medium: string; high: string };
    rowStyle: React.CSSProperties;
    eventStyle: React.CSSProperties;
    priceStyle: React.CSSProperties;
    sliderStyle: React.CSSProperties;
    sliderValue: number;
    onSliderChange: (idx: number, value: number) => void;
    idx: number;
}) {
    const eventName = event?.event_name || 'Unknown Event';
    const low = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
    const medium = Number((event?.medium || '').replace(/[^0-9.]/g, '')) || 0;
    const high = Number((event?.high || '').replace(/[^0-9.]/g, '')) || 0;
    const priceValues = [0, low, medium, high];
    const marks = [
        { value: 0, label: '$0' },
        { value: 1, label: `$${low}` },
        { value: 2, label: `$${medium}` },
        { value: 3, label: `$${high}` }
    ];
    return (
        <div style={rowStyle}>
            <div style={eventStyle}><p>{eventName}</p></div>
            <div style={priceStyle}><p>${priceValues[sliderValue]}</p></div>
            <div style={sliderStyle}>
                <Slider
                    value={sliderValue}
                    onChange={(_, val) => onSliderChange(idx, val as number)}
                    step={1}
                    min={0}
                    max={3}
                    marks={marks}
                    valueLabelDisplay="off"
                />
            </div>
        </div>
    );
}
// Utility to sum all 'low' values in events array
export function sumLowValues(events: Array<{ low: string }>) {
    if (!Array.isArray(events)) return 0;
    return events.reduce((acc, event) => {
        const val = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
    }, 0);
}
import React, { useState } from "react";
import Slider from '@mui/material/Slider';

type SpendingBreakdownCardProps = {
    title: string;
    events?: Array<{
        event_name: string;
        low: string;
        medium: string;
        high: string;
    }>;
    loading?: boolean;
};

export default function SpendingBreakdownCard({ title, events = [], loading = false, sliderValues = [], onSliderChange }: SpendingBreakdownCardProps & { sliderValues?: number[], onSliderChange?: (idx: number, value: number) => void }) {
    // Provide default no-op for onSliderChange to avoid type error
    const safeOnSliderChange = onSliderChange || (() => {});
    // Defensive: ensure events is always an array
    let safeEvents = Array.isArray(events) ? events : [];
    // Filter out events with all $0 values for low, medium, and high
    safeEvents = safeEvents.filter(event => {
        const low = Number((event?.low || '').replace(/[^0-9.]/g, '')) || 0;
        const medium = Number((event?.medium || '').replace(/[^0-9.]/g, '')) || 0;
        const high = Number((event?.high || '').replace(/[^0-9.]/g, '')) || 0;
        return low !== 0;
    });
    const [open, setOpen] = useState(false);
    const cardStyle = {
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#fff",
        width: "80%",
        maxWidth: "1000px",
        marginLeft: "auto",
        marginRight: "auto"
    };
    const rowStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
    };
    const eventStyle: React.CSSProperties = {
        width: "20%"
    };
    const priceStyle: React.CSSProperties = {
        width: "20%"
    };
    const sliderStyle: React.CSSProperties = {
        width: "60%",
        marginLeft: "1rem"
    };
    return (
        <div style={cardStyle}>
            <h3
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {title} {open ? "▲" : "▼"}
            </h3>
            {open && (
                <>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <span>Loading events...</span>
                        </div>
                    ) : (
                        safeEvents.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <span>No events found.</span>
                            </div>
                        ) : (
                            safeEvents.map((event, idx) => (
                                <SpendingBreakdownRow
                                    key={idx}
                                    event={event}
                                    rowStyle={rowStyle}
                                    eventStyle={eventStyle}
                                    priceStyle={priceStyle}
                                    sliderStyle={sliderStyle}
                                    sliderValue={sliderValues[idx] || 1}
                                    onSliderChange={safeOnSliderChange}
                                    idx={idx}
                                />
                            ))
                        )
                    )}
                </>
            )}
        </div>
    );
}