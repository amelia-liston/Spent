import React, { useState } from "react";

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
        width: "30%"
    };
    const priceStyle: React.CSSProperties = {
        width: "30%"
    };
    const scaleStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        width: "40%"
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
                                    <div style={rowStyle}>
                                        <div style={eventStyle}><p>Event 1</p></div>
                                        <div style={priceStyle}><p>$10</p></div>
                                        <div style={scaleStyle}>
                                            <span>$</span>
                                            <span>$$</span>
                                            <span>$$$</span>
                                        </div>
                                    </div>
                                    <div style={rowStyle}>
                                        <div style={eventStyle}><p>Event 2</p></div>
                                        <div style={priceStyle}><p>$20</p></div>
                                        <div style={scaleStyle}>
                                            <span>$</span>
                                            <span>$$</span>
                                            <span>$$$</span>
                                        </div>
                                    </div>
                                </>
                        )}
        </div>
    );
}