import React, { useState } from 'react';
import supabase from '../supabase/supabaseClient';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as needed


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setUser } = useAuth();

    const loginUser = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
            console.error('Error logging in:', error);
            return;
        }
        console.log(data.session.user);
        setUser(data.session.user);
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="">GPTHub</span>
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        {/* Placeholder for the actual functionality */}
                        
                    </div>
                    <div className=" flex gap-x-12">
                        <a href="/list" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                        <a href="/account" className="text-sm font-semibold leading-6 text-gray-900">Account</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                   
                    </div>
                </nav>

                {/* Mobile menu, shown/hidden based on state */}
                <div className="lg:hidden">
                    {/* Placeholder for actual mobile menu items */}
                    
                </div>
            </header>
            {/* Background shapes */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
        <div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white">
        <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
                    <p className="text-sm text-gray-600">Sign in to your account</p>
                </div>
        <form onSubmit={loginUser} className="space-y-6">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-4 border rounded" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mb-4 border rounded" />
            <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded;">Login</button>
        </form>
        <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="/register" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
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

export default LoginPage;
