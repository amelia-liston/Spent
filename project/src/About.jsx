import React from "react";
// Simple SVG icons for piggy bank, coins, target, and lightbulb
const PiggyBank = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="#FFD6EC"/><ellipse cx="40" cy="50" rx="25" ry="18" fill="#FFB6C1"/><ellipse cx="40" cy="38" rx="18" ry="14" fill="#FF69B4"/><circle cx="40" cy="38" r="8" fill="#fff"/><ellipse cx="40" cy="38" rx="4" ry="3" fill="#FF69B4"/><ellipse cx="48" cy="32" rx="2" ry="1.5" fill="#FFD700"/></svg>
);
const Coins = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="20" cy="40" r="15" fill="#FFD700"/><circle cx="40" cy="30" r="10" fill="#FFE066"/><text x="15" y="45" fontSize="12" fill="#333">$</text></svg>
);
const Target = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="28" stroke="#00C853" strokeWidth="4"/><circle cx="30" cy="30" r="18" stroke="#69F0AE" strokeWidth="4"/><circle cx="30" cy="30" r="8" fill="#00C853"/><rect x="28" y="10" width="4" height="20" fill="#00C853"/><polygon points="30,5 35,15 25,15" fill="#FF4081"/></svg>
);
const Lightbulb = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="35" rx="15" ry="20" fill="#FFF9C4"/><rect x="25" y="50" width="10" height="8" fill="#FFD600"/><ellipse cx="30" cy="55" rx="5" ry="2" fill="#FFD600"/></svg>
);

export default function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '0', fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fffbe9', borderRadius: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.15)', padding: '2.5rem 2rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <Target />
          <h1 style={{ color: '#FF69B4', fontWeight: 900, fontSize: '2.5rem', margin: 0, letterSpacing: 2 }}>SPENT</h1>
          <PiggyBank />
        </div>
        <h2 style={{ color: '#3D5AFE', fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>Predicted Spending</h2>
        <h3 style={{ color: '#333', fontWeight: 500, fontSize: '1.1rem', marginBottom: 24 }}>the future of budgeting</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <Coins />
          <Lightbulb />
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <h2 style={{ color: '#FF4081', fontWeight: 700, marginTop: 0 }}>Inspiration</h2>
          <p style={{ color: '#222', fontSize: '1.05rem', lineHeight: 1.7 }}>
            As college students, we have first hand experience of the struggle to allocate our spending money over the course of the semester/school year. Many of our friends and fellow college students have a shared experience where they spend the spending money they make over the summer in the first few weeks back at school and then are left broke for the rest of the semester. Other budgeting apps that allow users to set weekly goals often don't work for college students because every week in college is different. That's where our idea for Spent was born. What if AI told you how much money you are going to spend before you spend it? Gone are the days of budgeting out the small amount of money you have left after you've spent 90% of your savings. It's time to get ahead of your spending and make financial decisions and alterations before the money leaves your wallet.
          </p>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#00C853', fontWeight: 700, marginTop: 0 }}>Our Solution</h2>
          <p style={{ color: '#222', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Spent is a predicted spending app that takes the events in your Google Calendar and uses AI to estimate how much you will spend at each event. It tells you the three different prices each event will cost based on which of three experiences you choose to have (what you order, how you get there, etc.) and allows you to make decisions on your experiences while seeing the impact on your wallet as a whole.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 32, background: '#D4FFB6', borderRadius: 12, padding: '0.5rem 1rem', fontWeight: 600, color: '#222', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          By Clarissa Chen and Amelia Liston
        </div>
      </div>
    </div>
  );
}
