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
        <div style={cardStyle}>
            <h3
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {title} {open ? "▲" : "▼"}
            </h3>
            {open && (
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
            )}
        </div>
    );
}