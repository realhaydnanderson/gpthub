import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase/supabaseClient"; // Your Supabase client
import Container from "../components/Container";
import { useAuth } from "../AuthContext";

function AddGPT() {
  const { user, accessToken } = useAuth(); // Get the authenticated user from your context
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendRequest = async (name, description, url) => {
    console.log(accessToken);
    try {
      const res = await fetch("/api/addgpt", {
        method: "POST", // Assuming POST request
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        body: JSON.stringify({ name, description, url }), // Send data as JSON
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Chatbot added successfully!"); // Set success message
        setError(null);
      } else {
        throw new Error(data.message || "Error occurred");
      }
    } catch (err) {
      setError(err.message);
      setSuccess(""); // Clear any previous success messages
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.includes("chat.openai.com")) {
      setError('URL must contain "chat.openai.com".');
      return;
    }
    setError(""); // Clear any previous errors
    console.log({ name, description, url });

    sendRequest(name, description, url); // Pass the form data
  };

  return (
    <Container>
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        {/*Error and success notifications */}
        {error && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 fade-in`}
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 fade-in`}
            role="alert"
          >
            <strong className="font-bold">Success: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        {/*Error and success notifications */}

        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Add New Chatbot
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-2">
            Enter Chatbot Details
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="url"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Chatbot
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default AddGPT;
