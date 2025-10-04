import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `VITE_GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function Home() {
  const [user, setUser] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState(null);

  const [geminiResponse, setGeminiResponse] = useState(null);
  const [geminiEvents, setGeminiEvents] = useState([]);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (tokenResponse) => {
      setUser(tokenResponse);
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
          contents: `How much do you think each of these calendar events will cost me in Boston? Please output as a table with columns event_name, location, start, and end, as well as columns for the low, medium, and high prices for the activity and columns for each price detailing what each price includes separated by | . This should help me estimate how much each event will cost me based on my decisions.  ${JSON.stringify(res.data.items)}`,
        });
        setGeminiResponse(response.text);
        console.log(response.text);

        // Parse Gemini response as a table into an array of event objects
        const parseGeminiTable = (text) => {
          const lines = text.split('\n').map(line => line.trim()).filter(line => line);
          if (lines.length < 2) return [];
          // Find header row
          const headerIdx = lines.findIndex(line => line.includes('event_name'));
          if (headerIdx === -1) return [];
          const header = lines[headerIdx].split('|').map(h => h.trim()).filter(h => h);
          // Skip separator and header rows
          const dataRows = lines.slice(headerIdx + 2).filter(line => {
            const trimmed = line.replace(/\|/g, '').trim();
            // Exclude rows that are only dashes, empty, or match header
            return line.includes('|') && trimmed && !/^[-\s]+$/.test(trimmed) && !line.includes('event_name');
          });
          return dataRows.map(row => {
            // Remove leading/trailing pipes and split
            const cols = row.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
            // Only use as many columns as header length
            const obj = {};
            header.forEach((h, i) => {
              obj[h] = cols[i] || '';
            });
            return obj;
          });
        };

        const events = parseGeminiTable(response.text);
        setGeminiEvents(events);
        console.log(events);
      } catch (error) {
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

            {geminiEvents.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Gemini Events Table:</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f4f4f4' }}>
                  <thead>
                    <tr>
                      {Object.keys(geminiEvents[0]).map((key) => (
                        <th key={key} style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {geminiEvents.map((event, idx) => (
                      <tr key={idx}>
                        {Object.values(event).map((val, i) => (
                          <td key={i} style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
