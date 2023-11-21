import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import Navbar from '../components/navbar';

const AccountPage = () => {
    const { user, setUser, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    console.log('Loading:', loading, 'User:', user);

    const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
          setUser(null); // Set user to null to update context
          // Optionally, navigate to the login page or show a message
        } catch (error) {
          console.error('Error during logout:', error.message);
          // Handle any logout errors here
        }
      };

      const handleFormSubmit = async () => {
 
      };

    return (
        <div className="flex items-center justify-center min-h-screen">
          <Navbar/>
        {/* Background shapes */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
<div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
     style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
    <div className="w-full max-w-lg p-8 space-y-3 rounded-lg shadow-lg bg-white">
    <div className="text-center">
    <div>
            <h1 className='text-3xl'><span className="font-bold">Welcome, </span>{user ? user.email : ''}</h1>
            <button onClick={handleLogout} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded;">Logout</button>
        </div>
            </div>
        {/* Main content */}
    </div>

    <div className="absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80" aria-hidden="true">
<div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
     style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
</div>
    
        
    );
};


export default AccountPage;