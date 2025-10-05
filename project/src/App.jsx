import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
         <Link to="/" style={{ color: '#FF69B4', fontWeight: 900,  textDecoration: 'none', letterSpacing: 2 }}>SPENT</Link>
         <Link to="/about" style={{ color: '#3D5AFE', fontWeight: 700, textDecoration: 'none' }}>About</Link>
      </nav>
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
