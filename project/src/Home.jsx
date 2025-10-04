import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState(null);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (tokenResponse) => {
      setUser(tokenResponse);
      try {
        const now = new Date().toISOString();
        const res = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        setCalendarEvents(res.data);
        console.log(res.data);
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
          </div>
        )}
      </div>
    </div>
  );
}
