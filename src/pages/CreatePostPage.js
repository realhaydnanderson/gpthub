import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';

const CreatePostPage = () => {
    const { user, loading } = useAuth();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    useEffect(() => {
        // You can add any necessary authentication checks here
        if (loading || !user) {
            return <Navigate to="/login" />;
        }
    }, [loading, user]);

    const handleCreatePost = async () => {
        try {
            // Make an API call to create the post in your database
            const { data, error } = await supabase.from('posts').upsert([
                {
                    title: postTitle,
                    content: postContent,
                    user_id: user.id, // Assuming you have user authentication in place
                },
            ]);

            if (error) {
                console.error('Error creating post:', error.message);
                // Handle any post creation errors here
            } else {
                // Post created successfully, you can navigate to a success page or reset the form
                setPostTitle('');
                setPostContent('');
            }
        } catch (error) {
            console.error('Error creating post:', error.message);
            // Handle any unexpected errors here
        }
    };

    return (
        <div>
            <h1>Create a New Post</h1>
            <label htmlFor="postTitle">Title:</label>
            <input
                type="text"
                id="postTitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
                id="postContent"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    );
};

export default CreatePostPage;
