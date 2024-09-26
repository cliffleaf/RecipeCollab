import React from 'react';
import { signInWithPopup, googleProvider, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
            console.log('User logged in:', data);
            navigate('/');
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

export default LoginPage;
