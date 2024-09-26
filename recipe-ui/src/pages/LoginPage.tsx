import React from 'react';
import { signInWithPopup, googleProvider, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.idToken;

        fetch('https://leqem8y2p0.execute-api.ap-southeast-2.amazonaws.com/default/recipe-collab-login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token }),
        })
        .then((response) => response.json())
            .then((data) => {
            console.log('User logged in:', data); 
            navigate('/');
            })
            .catch((error) => console.error('Error during token exchange:', error));
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
