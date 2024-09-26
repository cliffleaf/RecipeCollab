import React from 'react';
import { signInWithPopup, googleProvider, auth } from '../firebase';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Get the Google ID token
        result.user.getIdToken().then((token) => {
          // Send the token to the backend
          fetch('https://your-backend-url.com/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          })
          .then((response) => response.json())
          .then((data) => {
            // Handle the backend response (e.g., store user info, redirect)
            console.log('User logged in:', data);
            history.push('/dashboard'); // Navigate to a different route on success
          })
          .catch((error) => console.error('Error during token exchange:', error));
        });
      })
      .catch((error: any) => {
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <button className="login-button google" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
