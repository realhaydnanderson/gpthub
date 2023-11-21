import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import supabase from '../supabase/supabaseClient';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility


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

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the state of the mobile menu
    };

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            GPTHub
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        {/* Placeholder for the actual functionality */}
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="/list" className="text-lg font-semibold leading-6 text-gray-900">Hub</a>
                        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Trending</a>
                        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Discover</a>
                        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Newsletter</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:gap-x-12 lg:justify-end">
                    {user ? <a href="/addgpt" className="text-md font-semibold leading-6 text-gray-700">Add GPT</a> : null}
                        {user ? <a href="/account" className="text-md font-semibold leading-6 text-gray-700">Account</a> : <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in →</a>}
                        {user ? <a href="#" onClick={handleLogout} className="text-md font-semibold leading-6 text-gray-700">Logout</a> : null}
                    </div>

                    {/* ... other navbar content ... */}
                    <div className="flex text-lg lg:hidden">
                    <button onClick={toggleMenu} className="p-2">
                        {/* Placeholder for the hamburger icon */}
                        <span className="sr-only">Menu</span>
                        &#9776; {/* This is the Unicode character for a hamburger icon */}
                    </button>
                    </div>
                </nav>
            </header>

            {/* Overlay for darkening the screen */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleMenu}></div>
            )}

            {/* Drawer-style mobile menu */}
            <div id="drawer-navigation" className={`fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} bg-white w-64 dark:bg-gray-800`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
                <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                <button onClick={toggleMenu} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    {/* Close icon */}
                </button>
                <div className="py-4 overflow-y-auto">
                    {/* Menu items */}
                    <a href="/list" className="text-lg font-semibold leading-6 text-gray-900">Hub</a>
                    <br></br>
                    <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Trending</a>
                    <hr className="my-2 border-gray-200" />
                    {user ? (
                        <>
                            <a href="/addgpt" className="block text-lg font-semibold leading-6 text-gray-900">Add GPT</a>
                            <a href="/account" className="block text-lg font-semibold leading-6 text-gray-900">Account</a>
                            <a href="#" onClick={handleLogout} className="block text-lg font-semibold leading-6 text-gray-900">Logout</a>
                        </>
                    ) : (
                        <a href="/login" className="block text-lg font-semibold leading-6 text-gray-900">Log in →</a>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
