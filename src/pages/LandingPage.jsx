import React from 'react';
import { signIn } from '../../firebase';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function LandingPage(){
    const {user} = useAuth();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl mb-6 text-gray-900 font-bold">
                Welcome to Flair Notes
            </h1>
            {(!user) && (<button
                onClick={signIn}
                className="px-8 py-3 text-lg bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
                Sign In
            </button>)}
       </div>
        
    )};
