import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import supabase from '../supabase/supabaseClient';

const Navbar = () => {
    const { user } = useAuth();

    return (
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="">GPTHub</span>
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        {/* Placeholder for the actual functionality */}
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="/list" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                        <a href="/list" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:gap-x-12 lg:justify-end">
                    {user ? <a href="/add-gpt" className="text-sm font-semibold leading-6 text-gray-900">Add GPT</a> : null}
                        {user ? <a href="/account" className="text-sm font-semibold leading-6 text-gray-900">Account</a> : <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in →</a>}
                    </div>
                </nav>

                {/* Mobile menu, shown/hidden based on state */}
                <div className="lg:hidden">
                    {/* Placeholder for actual mobile menu items */}
                </div>
            </header>
    );
};

export default Navbar;
