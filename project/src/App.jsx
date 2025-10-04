import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#f0f0f0", borderRadius: "100px", margin: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
