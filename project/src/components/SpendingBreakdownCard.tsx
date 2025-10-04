import React, { useState } from "react";
import Slider from '@mui/material/Slider';

type SpendingBreakdownCardProps = {
    title: string;
};

export default function SpendingBreakdownCard({ title }: SpendingBreakdownCardProps) {
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
        const marks = [
            { value: 0, label: '$0' },
            { value: 1, label: '$' },
            { value: 2, label: '$$' },
            { value: 3, label: '$$$' }
        ];
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
                    <div style={rowStyle}>
                        <div style={eventStyle}><p>Event 1</p></div>
                        <div style={priceStyle}><p>$10</p></div>
                        <div style={sliderStyle}>
                            <Slider
                                defaultValue={0}
                                step={1}
                                min={0}
                                max={3}
                                marks={marks}
                                valueLabelDisplay="off"
                            />
                        </div>
                    </div>
                    <div style={rowStyle}>
                        <div style={eventStyle}><p>Event 2</p></div>
                        <div style={priceStyle}><p>$20</p></div>
                        <div style={sliderStyle}>
                            <Slider
                                defaultValue={0}
                                step={1}
                                min={0}
                                max={3}
                                marks={marks}
                                valueLabelDisplay="off"
                            />
                        </div>
                    </div>
                </>
             )}
        </div>
    );
}