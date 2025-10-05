import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import Dashboard from "./Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

// The client gets the API key from the environment variable `VITE_GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function Home() {
  const [user, setUser] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState(null);

  const [geminiResponse, setGeminiResponse] = useState(null);
  const [geminiEvents, setGeminiEvents] = useState([]);
  const [loadingGemini, setLoadingGemini] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (tokenResponse) => {
      setUser(tokenResponse);
      setLoadingGemini(true);
      try {
        const now = new Date().toISOString();
        const fourMonthsLater = new Date();
        fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);
        const timeMax = fourMonthsLater.toISOString();

        const res = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&timeMax=${encodeURIComponent(timeMax)}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        // Only keep summary, location, start, and end for each event
        const filteredEvents = (res.data.items || []).map(event => ({
          event_name: event.summary,
          location: event.location,
          start: event.start,
          end: event.end
        }));
        setCalendarEvents(filteredEvents);
        console.log(res.data);

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `How much do you think each of these calendar events will cost me in Boston? Please output as a table with columns event_name, location, start, and end, as well as columns for the low, medium, and high prices for the activity and columns for each price detailing what each price includes separated by commas. Only give me one price per category, not a range. This should help me estimate how much each event will cost me based on my decisions.  ${JSON.stringify(res.data.items)}`,
        });
  setGeminiResponse(response.text);
  setLoadingGemini(false);
  console.log(response.text);

        // Parse Gemini response as a table into an array of event objects
        const parseGeminiTable = (text) => {
          const lines = text.split('\n').map(line => line.trim()).filter(line => line);
          if (lines.length < 2) return [];
          // Find header row
          const headerIdx = lines.findIndex(line => line.toLowerCase().includes('event_name'));
          if (headerIdx === -1) return [];
          // Normalize header names
          const header = lines[headerIdx].split('|').map(h => h.trim().toLowerCase().replace(/\s+/g, '_')).filter(h => h);
          // Skip separator and header rows
          const dataRows = lines.slice(headerIdx + 2).filter(line => {
            const trimmed = line.replace(/\|/g, '').trim();
            // Exclude rows that are only dashes, empty, or match header
            return line.includes('|') && trimmed && !/^[-\s]+$/.test(trimmed) && !line.toLowerCase().includes('event_name');
          });
          return dataRows.map(row => {
            // Remove leading/trailing pipes and split
            const cols = row.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
            // Only use as many columns as header length
            const obj = {};
            header.forEach((h, i) => {
              obj[h] = cols[i] || '';
            });
            // Map normalized keys to expected props for SpendingBreakdownCard
            return {
              event_name: obj['event_name'] || '',
              low: obj['low'] || obj['low_price'] || '',
              medium: obj['medium'] || obj['medium_price'] || '',
              high: obj['high'] || obj['high_price'] || '',
              ...obj
            };
          });
        };

        const events = parseGeminiTable(response.text);
        // Group events by week for the next month
        const nowDate = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(nowDate.getMonth() + 1);
        // Helper to get week number from date
        function getWeekNumber(date) {
          const start = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
          const diff = (date - start) / (1000 * 60 * 60 * 24);
          return Math.floor(diff / 7) + 1;
        }
        // Parse and group
        const monthEvents = events.filter(ev => {
          let startDate = ev.start;
          if (startDate && typeof startDate === 'object' && startDate.dateTime) {
            startDate = startDate.dateTime;
          } else if (startDate && typeof startDate === 'object' && startDate.date) {
            startDate = startDate.date;
          }
          const d = new Date(startDate);
          return d >= nowDate && d < oneMonthLater;
        });
        const weeks = {};
        monthEvents.forEach(ev => {
          let startDate = ev.start;
          if (startDate && typeof startDate === 'object' && startDate.dateTime) {
            startDate = startDate.dateTime;
          } else if (startDate && typeof startDate === 'object' && startDate.date) {
            startDate = startDate.date;
          }
          const d = new Date(startDate);
          const weekNum = getWeekNumber(d);
          if (!weeks[weekNum]) weeks[weekNum] = [];
          weeks[weekNum].push(ev);
        });
        // Also filter for just the next week
        const oneWeekLater = new Date();
        oneWeekLater.setDate(nowDate.getDate() + 7);
        const weekEvents = events.filter(ev => {
          let startDate = ev.start;
          if (startDate && typeof startDate === 'object' && startDate.dateTime) {
            startDate = startDate.dateTime;
          } else if (startDate && typeof startDate === 'object' && startDate.date) {
            startDate = startDate.date;
          }
          const d = new Date(startDate);
          return d >= nowDate && d < oneWeekLater;
        });
        setGeminiEvents({ monthWeeks: weeks, weekEvents });
        console.log({ monthWeeks: weeks, weekEvents });
      } catch (error) {
        setLoadingGemini(false);
        console.error('Error fetching calendar events:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'implicit',
  });

  const handleLogout = () => {
    setUser(null);
    setCalendarEvents(null);
    console.log('Logged out');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the simple React app! This is the home page.</p>
      <div style={{ marginTop: '2rem' }}>
        {!user ? (
          <button onClick={() => login()}>Sign in with Google</button>
        ) : (
          <div>
            <p>Logged in!</p>
            <button onClick={handleLogout}>Logout</button>
            {calendarEvents && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Your Calendar Events:</h3>
                <pre style={{ textAlign: 'left', background: '#f4f4f4', padding: '1rem' }}>
                  {JSON.stringify(calendarEvents, null, 2)}
                </pre>
              </div>
            )}

            {geminiResponse && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Gemini Response:</h3>
                <pre style={{ textAlign: 'left', background: '#f4f4f4', padding: '1rem' }}>
                  {geminiResponse}
                </pre>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <ErrorBoundary>
                <Dashboard
                  monthWeeks={geminiEvents.monthWeeks}
                  weekEvents={geminiEvents.weekEvents}
                  loadingMonth={loadingGemini}
                />
              </ErrorBoundary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
