// gpt-directory/src/pages/Register.js
import React, { useState } from 'react';
import supabase from '../supabase/supabaseClient';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await supabase.auth.signUp({ email, password });
    console.log('SignUp Response:', response);
  
    const { user, error } = response.data;
    if (error) console.error('Error registering:', error);
    else console.log('User registered:', user);

    const { data, insertError } = await supabase
        .from('user_profiles')
        .insert([{ id: user.id, /* other default profile fields */ }]);

    if (insertError) {
        console.error('Error creating user profile:', insertError);
    }
  };
  

  return (

<div className="flex items-center justify-center min-h-screen">
{/* Background shapes */}
<div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
<div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white">
<div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome!</h1>
        <p className="text-sm text-gray-600">Create a new account.</p>
    </div>
<form onSubmit={registerUser} className="space-y-6">
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-4 border rounded" />
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mb-4 border rounded" />
<button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded;">Register</button>
</form>
<div className="text-center mt-6">
        <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Login</a>
        </p>
    </div>
</div>

<div className="absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
</div>


  );
};

export default RegistrationPage;

