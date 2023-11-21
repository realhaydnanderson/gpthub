import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient'; // Your Supabase client

function UserProfile() {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_profiles') // Your table name
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user?.username}</h1>
      {/* Render other user details */}
    </div>
  );
}

export default UserProfile;