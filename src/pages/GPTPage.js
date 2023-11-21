import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient'; // Your Supabase client



  const StarRating = ({ category, onRating }) => {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
  
    const handleRating = (index) => {
      const newRating = index + 1;
      setSelectedRating(newRating);
      onRating(category.name, newRating);
    };
  
    return (
      <div className="flex items-center">
        <div className="text-lg font-bold mr-2">{category.name}:</div>
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleRating(index)}
            className={`cursor-pointer w-6 h-6 ${selectedRating > index ? 'text-yellow-400' : hoverIndex !== null && hoverIndex >= index ? 'text-yellow-300' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
        ))}
      </div>
    );
  };
  

function GPTPage() {
  const { slug } = useParams();
  const [chatbot, setChatbot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({
    'Complexity': 0,
    'Ease of Use': 0,
    'Added Value': 0
  });

  const handleRating = (category, rating) => {
    setRatings({ ...ratings, [category]: rating });
  };

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gpt_list') // Your table name
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setChatbot(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbot();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;



  


  const categories = [
    { name: 'Complexity', stars: 4, rating: 4.5 },
    { name: 'Ease of Use', stars: 3, rating: 3.0 },
    { name: 'Added Value', stars: 5, rating: 4.9 },
  ];

  const handleSubmitReview = () => {
    console.log('Submitted Ratings:', ratings);
    // Here, you can also add additional logic to handle the submission,
    // such as sending the data to a server or showing a confirmation message.
  };
  
  const RatingComponent = () => (
    <div>
      {categories.map(category => (
        <div key={category.name} className="mb-4">
          <div className="text-lg font-bold">{category.name}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < category.stars ? 'text-yellow-300' : 'text-gray-300'} me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="ms-2 text-sm font-medium">
              {category.rating} out of 5
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (


<div className="min-h-screen p-4">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="">GPTHub</span>
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </a>
                    </div>
                    <div className="flex lg:hidden ">
                        {/* Mobile menu button */}
                        {/* Placeholder for the actual functionality */}
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="/list" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                        <a href="/account" className="text-sm font-semibold leading-6 text-gray-900">Account</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in →</a>
                    </div>
                </nav>

                {/* Mobile menu, shown/hidden based on state */}
                <div className="lg:hidden">
                    {/* Placeholder for actual mobile menu items */}
                </div>
            </header>
            {error ? (
                <p className="text-red-400">Error: {error}</p>
            ) : (
<div className="container mx-auto pt-20 p-4">
  <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
    
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-xl p-4 shadow-sm">
      <h1 className="text-3xl font-bold text-white text-center">{chatbot?.name}</h1>
      <p className="text-md text-indigo-100 mt-2 text-center">{chatbot?.description}</p>
    </div>

    <div className="mt-6 text-center">
      <a href={chatbot?.link} target="_blank" rel="noopener noreferrer">
        <button className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Visit
        </button>
      </a>
    </div>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <RatingComponent/>
    </div>
  </div>
</div>

            )}

<div className="container mx-auto mt-8">
        <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-4">Leave a Review</h2>
          {categories.map(category => (
            <StarRating key={category.name} category={category} onRating={handleRating} />
          ))}
          <button onClick={handleSubmitReview} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Submit Review
          </button>
        </div>
      </div>

<div className="absolute inset-x-0 top-[calc(80%-13rem)] bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80" aria-hidden="true">
    <div className="relative left-1/2 aspect-[1155/678] w-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-3/4"
         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
</div>
  
        </div>
  );
}

export default GPTPage;
