import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient'; // Your Supabase client
import Navbar from '../components/navbar';




function AddGPT() {

  const handleSubmitReview = () => {
    
    // Here, you can also add additional logic to handle the submission,
    // such as sending the data to a server or showing a confirmation message.
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
    {/*Main content */}


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
