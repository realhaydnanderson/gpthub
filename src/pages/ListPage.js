import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import supabase from '../supabase/supabaseClient';

import Navbar from '../components/navbar';

const ListPage = () => {
    const { user } = useAuth();

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('gpt_list')
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

        fetchData();
    }, []);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    // Split data into featured and regular items
    const featuredItems = data.filter(item => item.isfeatured);
    const regularItems = data.filter(item => !item.isfeatured);

    const renderRating = (rating) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            ))}
            <p className="ml-1 text-sm font-medium text-gray-500">{rating.toFixed(2)}</p>
            <p className="ml-1 text-sm font-medium text-gray-500">out of</p>
            <p className="ml-1 text-sm font-medium text-gray-500">5</p>
        </div>
    );
    

    const renderItem = (item, index) => (
        <li key={index} className="bg-white p-4 rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-48 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold text-lg text-gray-900 truncate"><a href={item.link}>{item.name}</a></h3>
                <p className="text-gray-600 text-sm overflow-ellipsis overflow-hidden h-14">{item.description}</p>
            </div>
            <div>
                {renderRating(item.rating)}
                <a href={"/chatbot/" + item.slug} target="_blank" rel="noopener noreferrer">
                    <button style={{ background: 'linear-gradient(to bottom right, #fdc5f5, #72ddf7)' }} className="text-white font-bold py-2 px-4 rounded mt-2">
                            Visit 
                    </button>
                </a>
            </div>
        </li>
    );

    return (
        <div className="min-h-screen p-4">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            <Navbar/>
            {error ? (
                <p className="text-red-400">Error: {error}</p>
            ) : (
                <div className="container mx-auto pt-20 p-4">
                    {/* Featured Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Featured GPTs</h2>
                        <ul className="grid grid-cols-2 gap-4">
                            {featuredItems.map(renderItem)}
                        </ul>
                    </div>
                    
                    {/* Regular Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">All GPTs</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            {regularItems.map(renderItem)}
                        </ul>
                    </div>

                    
                </div>
            )}

<div className="absolute inset-x-0 top-[calc(80%-13rem)] bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
  
        </div>
    );
};

export default ListPage;
