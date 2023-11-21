import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from './supabase/supabaseClient'; // Adjust this import according to your setup

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null); // State for access token
    const [audience, setAudience] = useState(null); // State for audience
    const [loading, setLoading] = useState(true); // Retain the loading state

    useEffect(() => {
        // Check the current session and set the user
        const fetchSession = async () => {
            const { data: session } = await supabase.auth.getSession();
            if (session.session) {
                setAccessToken(session.session.access_token);
                setAudience(session.session.user.aud);
                setUser(session.session.user);
                console.log('Initial session:', session.session.user);
            }
            setLoading(false);
        };
    
        fetchSession();

        
        // Set up a listener for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                // Update access token and audience in the state when session changes
                setAccessToken(session.access_token);
                setAudience(session.user.aud);

                setUser(session.user);
            } else {
                // Clear access token and audience if there is no session
                setAccessToken(null);
                setAudience(null);
                setUser(null);
            }
        });

   

        // Cleanup listener on unmount
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, audience, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
