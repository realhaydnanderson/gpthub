import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import your authentication context
import supabase from '../supabase/supabaseClient'; // Import your Supabase client

const AccessControlTest = () => {
    const { user, accessToken } = useAuth(); // Get the authenticated user from your context

    const [data, setData] = useState([]);
  

    useEffect(() => {
        // Function to fetch data from the Supabase table
        const fetchData = async () => {
            try {
                // Fetch data from your Supabase table (replace 'your_table_name' with your actual table name)
                const { data, error } = await supabase
                    .from('posts')
                    .select('*');

                if (error) {
                    setError(error.message);
                } else {
                    setData(data);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        // Only fetch data if the user is authenticated
        if (user) {
            fetchData();
        }
    }, [user]);

    const handleWriteAccess = async () => {
        try {
            // Check if the user is authenticated
            if (user) {
                // Perform a write operation, such as creating a new row (replace 'your_table_name' with your actual table name)
                const { data, error } = await supabase
                    .from('posts')
                    .insert([
                        {
                            column1: 'value1',
                            column2: 'value2',
                            // Add other columns and values as needed
                        },
                    ]);

                if (error) {
                    setError(error.message);
                } else {
                    // Data was successfully written
                    console.log('Data written:', data);
                }
            } else {
                // Handle cases where the user is not authenticated
                setError('User is not authenticated.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const testUnprotectedRoute = async () => {
        try {
            const res = await fetch('/unprotected');
            const data = await res.json();
            setResponse(data.message);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const testProtectedRoute = async () => {
        console.log(accessToken)
        try {
            const res = await fetch('/protected', {
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : ''
                }
            });
            const data = await res.json();
            setResponse(data.message);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Access Control Test</h1>
            {user ? (
                <>
                    <p>User is authenticated as: {user.email}</p>
                    <button onClick={handleWriteAccess}>Test Write Access</button>
                    <h2>Read Access Test</h2>
                    {error ? <p>Error: {error}</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
                </>
            ) : (
                <p>User is not authenticated. Please log in.</p>
            )}
            <h1>JWT Backend Test</h1>
            {user ? (
                <>
                    <p>User is authenticated as: {user.email}</p>
                    <button onClick={testUnprotectedRoute}>Test Unprotected Route</button>
                    <button onClick={testProtectedRoute}>Test Protected Route</button>
                    {response && <p>Response: {response}</p>}
                </>
            ) : (
                <p>User is not authenticated. Please log in.</p>
            )}
        </div>
    );
};

export default AccessControlTest;
