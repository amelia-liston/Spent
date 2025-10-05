// Child component for each event row
function SpendingBreakdownRow({ event, rowStyle, eventStyle, priceStyle, sliderStyle, sliderValue, onSliderChange, idx }) {
    // Defensive: ensure event properties exist
    const eventName = event && event.event_name ? event.event_name : 'Unknown Event';
    const low = Number((event && event.low ? event.low : '').replace(/[^0-9.]/g, '')) || 0;
    const medium = Number((event && event.medium ? event.medium : '').replace(/[^0-9.]/g, '')) || 0;
    const high = Number((event && event.high ? event.high : '').replace(/[^0-9.]/g, '')) || 0;
    const priceValues = [0, low, medium, high];
    // Parse price includes values (pipe-separated)
    const priceIncludes = [
        (event && event.low_includes ? event.low_includes : '').split('|').map(s => s.trim()).filter(Boolean),
        (event && event.medium_includes ? event.medium_includes : '').split('|').map(s => s.trim()).filter(Boolean),
        (event && event.high_includes ? event.high_includes : '').split('|').map(s => s.trim()).filter(Boolean)
    ];
    priceIncludes.unshift([]); // $0 bubble
    const marks = [
        { value: 0, label: '$0' },
        { value: 1, label: `$${low}` },
        { value: 2, label: `$${medium}` },
        { value: 3, label: `$${high}` }
    ];
    const bubbleStyle = {
        display: 'inline-block',
        background: '#e0e7ff',
        color: '#333',
        borderRadius: '16px',
        padding: '0.3em 0.8em',
        margin: '0 0.3em 0.5em 0',
        fontSize: '0.95em',
        border: '1px solid #b6b6b6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
    };
    return (
        <div style={rowStyle}>
            <div style={eventStyle}><p>{eventName}</p></div>
            <div style={priceStyle}><p>${priceValues[sliderValue]}</p></div>
            <div style={{ width: '100%' }}>
                {/* Show all three price includes bubbles for low, medium, high */}
                <div style={{ marginBottom: '0.5em', display: 'flex', gap: '0.5em', flexDirection: 'row' }}>
                    {[1,2,3].map((priceIdx) => (
                        <div key={priceIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '1em' }}>
                            {priceIncludes[priceIdx].length > 0 ? (
                                priceIncludes[priceIdx].map((inc, i) => (
                                    <span key={i} style={bubbleStyle}>
                                        {priceIdx === 1 ? `$${low}` : priceIdx === 2 ? `$${medium}` : `$${high}`}: {inc}
                                    </span>
                                ))
                            ) : (
                                <span style={{ ...bubbleStyle, background: '#f3f3f3', color: '#888' }}>
                                    {priceIdx === 1 ? `$${low}` : priceIdx === 2 ? `$${medium}` : `$${high}`}: No details
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div style={sliderStyle}>
                    <Slider
                        value={sliderValue}
                        onChange={(_, val) => onSliderChange(idx, val)}
                        step={1}
                        min={0}
                        max={3}
                        marks={marks}
                        valueLabelDisplay="off"
                    />
                </div>
            </div>
        </div>
    );
}
// Utility to sum all 'low' values in events array
export function sumLowValues(events) {
    if (!Array.isArray(events)) return 0;
    return events.reduce((acc, event) => {
        const val = Number((event && event.low ? event.low : '').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
    }, 0);
}
import React, { useState } from "react";
import Slider from '@mui/material/Slider';

export default function SpendingBreakdownCard({ title, events = [], loading = false, sliderValues = [], onSliderChange }) {
    const safeOnSliderChange = onSliderChange || (() => {});
    let safeEvents = Array.isArray(events) ? events : [];
    if (safeEvents.length && typeof safeEvents[0] === 'object') {
        safeEvents = safeEvents.filter(event => {
            const low = Number((event && event.low ? event.low : '').replace(/[^0-9.]/g, '')) || 0;
            return low !== 0;
        });
    }
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
    const rowStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
    };
    const eventStyle = {
        width: "20%"
    };
    const priceStyle = {
        width: "20%"
    };
    const sliderStyle = {
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
                                    sliderValue={sliderValues[idx] ?? 0}
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
