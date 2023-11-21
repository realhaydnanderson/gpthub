import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';

const ViewPostsPage = () => {
    const { user, loading } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // You can add any necessary authentication checks here
        if (loading || !user) {
            return <Navigate to="/login" />;
        }

        // Fetch the user's posts from the database
        async function fetchUserPosts() {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('user_id', user.id); // Fetch posts created by the current user

                if (error) {
                    console.error('Error fetching user posts:', error.message);
                    // Handle any fetch errors here
                } else {
                    setUserPosts(data);
                }
            } catch (error) {
                console.error('Error fetching user posts:', error.message);
                // Handle any unexpected errors here
            }
        }

        fetchUserPosts();
    }, [loading, user]);

    return (
        <div>
            <h1>Your Posts</h1>
            {userPosts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul>
                    {userPosts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewPostsPage;
