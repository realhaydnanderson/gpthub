import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient'; // Your Supabase client
import Navbar from '../components/navbar';
import { useAuth } from '../AuthContext';



function AddGPT() {
    const { user, accessToken } = useAuth(); // Get the authenticated user from your context
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const sendRequest = async (name, description, url) => {
        console.log(accessToken);
        try {
            const res = await fetch('/api/addgpt', {
                method: 'POST', // Assuming POST request
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken ? `Bearer ${accessToken}` : ''
                },
                body: JSON.stringify({ name, description, url }) // Send data as JSON
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess('Chatbot added successfully!'); // Set success message
                setError(null);
            } else {
                throw new Error(data.message || 'Error occurred');
            }
        } catch (err) {
            setError(err.message);
            setSuccess(''); // Clear any previous success messages
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.includes('chat.openai.com')) {
            setError('URL must contain "chat.openai.com".');
            return;
        }
        setError(''); // Clear any previous errors
        console.log({ name, description, url });
    
        sendRequest(name, description, url); // Pass the form data
    };
    


  return (


<div className="min-h-screen p-4">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            <Navbar/>


            <div className="container mx-auto pt-20 p-4">
                
        <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        {error && (
  <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 fade-in`} role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{error}</span>
  </div>
)}{success && (
    <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 fade-in`} role="alert">
        <strong className="font-bold">Success: </strong>
        <span className="block sm:inline">{success}</span>
    </div>
)}
          <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Add New Chatbot</h1>
<h2 className="text-xl text-center text-gray-600 mb-2">Enter Chatbot Details</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">URL</label>
              <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Add Chatbot
              </button>
            </div>
          </form>
        </div>
      </div>

<div className="absolute inset-x-0 top-[calc(80%-13rem)] bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
  
        </div>
  );
}

export default AddGPT;
