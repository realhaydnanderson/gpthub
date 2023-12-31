import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Container from "../components/Container";

const AccountPage = () => {
  const { user, setUser, loading } = useAuth();
  const [username, setUsername] = useState("");

  const [bio, setBio] = useState(""); // Added bio state
  const [gptList, setGptList] = useState([]);
  const [clickCounts, setClickCounts] = useState({});
  console.log("Loading:", loading, "User:", user);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null); // Set user to null to update context
      // Optionally, navigate to the login page or show a message
    } catch (error) {
      console.error("Error during logout:", error.message);
      // Handle any logout errors here
    }
  };

  const handleFormSubmit = async () => {};
  const countClicks = async (chatbotId, timeWindow) => {
    try {
      const since = new Date(Date.now() - timeWindow);
      const { data, error } = await supabase
        .from("click_tracking")
        .select()
        .eq("chatbot_id", chatbotId)
        .gte("clicked_at", since.toISOString());

      if (error) {
        console.error("Error counting clicks:", error.message);
        return 0;
      } else {
        return data.length; // Return the count of clicks
      }
    } catch (error) {
      console.error("Error counting clicks:", error.message);
      return 0;
    }
  };
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch GPT list
        const { data: gptData, error: gptError } = await supabase
          .from("gpt_list")
          .select()
          .neq("user_id", user.id);

        if (gptError) {
          console.error("Error fetching GPT list:", gptError.message);
          return;
        }
        setGptList(gptData);

        // Fetch click counts
        const clickCountsPromises = gptData.map((gptItem) =>
          countClicks(gptItem.id, 24 * 60 * 60 * 1000)
        );
        const clicks = await Promise.all(clickCountsPromises);
        const newClickCounts = clicks.reduce((acc, count, index) => {
          acc[gptData[index].id] = count;
          return acc;
        }, {});
        setClickCounts(newClickCounts);
      } catch (error) {
        console.error("Error during data fetching:", error.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Container>
      <div className="flex items-center justify-center flex-col">
        <div className="w-full max-w-lg p-8 space-y-3 rounded-lg shadow-lg bg-white">
          <div className="text-center">
            <div>
              <h1 className="text-3xl">
                <span className="font-bold">Welcome, </span>
                {user ? user.email : ""}
              </h1>
            </div>
          </div>
          {/* Main content */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block font-bold text-gray-700"
              >
                Username
              </label>
              <div className="relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
                  @
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input py-2 pl-8 pr-3 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Your username"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block font-bold text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-textarea mt-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                rows="4"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            {/* Other form fields go here */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-800"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="w-full max-w-lg p-8 mt-8 space-y-3 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold">My GPTs</h2>
          {/* Add content related to "My GPTs" here */}
          <ul>
            {gptList.map((gptItem) => (
              <li key={gptItem.id}>
                {/* Display the GPT item details */}
                <p>{gptItem.name}</p>
                <p>Clicks in last 24 hours: {clickCounts[gptItem.id] || 0}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AccountPage;
