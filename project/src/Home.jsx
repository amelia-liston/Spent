import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Home() {
  return (
    <GoogleOAuthProvider clientId="571696130341-sgejgrap1u1odfgvg53vme8p7f17drp8.apps.googleusercontent.com">
      <div>
        <h1>Home Page</h1>
        <p>Welcome to the simple React app! This is the home page.</p>
        <div style={{ marginTop: '2rem' }}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log('Login Success:', credentialResponse);
              // You can handle the login response here
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
