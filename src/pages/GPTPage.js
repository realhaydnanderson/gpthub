import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase/supabaseClient"; // Your Supabase client
import Navbar from "../components/navbar";
import { useAuth } from "../AuthContext";

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
      <div className="text-md font-medium text-gray-500 mr-2">
        {category.name}:
      </div>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => handleRating(index)}
          className={`cursor-pointer w-6 h-6 ${
            selectedRating > index
              ? "text-yellow-400"
              : hoverIndex !== null && hoverIndex >= index
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
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
  const [ratings, setRatings] = useState({});
  const [reviewComment, setReviewComment] = useState("");
  const [success, setSuccess] = useState(null)
  const [categories, setCategories] = useState({});


  const { user, accessToken } = useAuth();

  const handleRating = (category, rating) => {
    setRatings({ ...ratings, [category]: rating });
  };

  const handleReviewCommentChange = (e) => {
    setReviewComment(e.target.value);
  };
  

  useEffect(() => {
    const fetchChatbotAndRatings = async () => {
      try {
        setLoading(true);
        
        // Fetch chatbot data
        const { data: chatbotData, error: chatbotError } = await supabase
          .from("gpt_list")
          .select("*")
          .eq("slug", slug)
          .single();

        console.log(chatbotData)
  
        if (chatbotError) throw chatbotError;
        setChatbot(chatbotData);
  
        // Fetch average ratings
        const { data: ratingData, error: ratingError } = await supabase
          .from("gptlist_averages")
          .select("*")
          .eq("gptlist_id", chatbotData.id)
          .single();
  
        // if (ratingError){
        //     setError(ratingError);
        // }
        // Update categories with fetched ratings
        if(ratingData != null){
            setCategories([
            { name: "Innovativeness", rating: ratingData.avg_innovativeness },
            { name: "User-Friendliness", rating: ratingData.avg_user_friendliness },
            { name: "Functionality", rating: ratingData.avg_functionality },
            { name: "Value Addition", rating: ratingData.avg_value_addition },
            ]);
        } else {
            setCategories([
                { name: "Innovativeness", rating: 0 },
                { name: "User-Friendliness", rating: 0 },
                { name: "Functionality", rating: 0 },
                { name: "Value Addition", rating: 0 },
                ]);
        }
        
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchChatbotAndRatings();
  }, [slug]);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSubmitReview = async () => {
    console.log("Submitted Ratings:", ratings);
    console.log("Submitted comment:", reviewComment);
    // Here, you can also add additional logic to handle the submission,
    // such as sending the data to a server or showing a confirmation message.
    console.log(accessToken);
        try {
            const res = await fetch('/api/addcomment', {
                method: 'POST', // Assuming POST request
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken ? `Bearer ${accessToken}` : ''
                },
                body: JSON.stringify({ ratings, reviewComment, chatbot_id: chatbot.id }) // Send data as JSON
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess('Review Added!'); // Set success message
                setError(null);
            } else {
                throw new Error(data.message || 'Error occurred');
            }
        } catch (err) {
            setError(err.message);
            setSuccess(''); // Clear any previous success messages
        }
  };

  const handleVisitClick = async () => {
    try {
      const { data, error } = await supabase
        .from('click_tracking') // Replace with your table name
        .insert([
          { chatbot_id: chatbot?.id, user_id: user?.id, source: "link" }
        ]);

      if (error) throw error;
      // Optionally, you can do something with the response data
    } catch (err) {
      console.error('Error logging click:', err.message);
    }
  };

  const RatingComponent = () => (
    <div>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <div className="text-lg font-bold">{category.name}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(category.rating) ? "text-yellow-300" : "text-gray-300"
                } me-1`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="ms-2 text-sm font-medium">
              {category.rating.toFixed(1)} out of 5
            </span>
          </div>
        </div>
      ))}
    </div>
  );
  

  return (
    <div className="min-h-screen p-4">
      {/* Background shapes */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <Navbar />
      {error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : (
        <div className="container md:w-2/3 mx-auto pt-20 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chatbot Information Column */}
            <div className="md:w-full p-4 bg-white rounded-xl shadow-xl border border-gray-200">
              <div className="p-8 text-center">
                <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">
                  {chatbot?.name}
                </div>
                <a
                  href={chatbot?.link}
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {chatbot?.title}
                </a>
                <p className="mt-2 text-gray-500">{chatbot?.description}</p>
              </div>

              <div className="mt-6 text-center">
                <a
                  href={chatbot?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    style={{
                      background:
                        "linear-gradient(to bottom right, #fdc5f5, #72ddf7)",
                    }}
                    className="text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleVisitClick}
                  >
                    Visit
                  </button>
                </a>
              </div>
            </div>
            <div className="md:w-full p-4 bg-white rounded-xl shadow-xl border border-gray-200">
                {loading ? 
                <p>Loading...</p>
                :
                <RatingComponent />
                }
              
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto mt-8">
        <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-4">
            Leave a Review
          </h2>
          {user ? (
            <>
              {categories.map((category) => (
                <StarRating
                  key={category.name}
                  category={category}
                  onRating={handleRating}
                />
              ))}
              <div className="mt-4 mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="reviewComment"
        >
          Review Comment
        </label>
        <textarea
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          id="reviewComment"
          name="reviewComment"
          rows="4"
          value={reviewComment}
          onChange={handleReviewCommentChange}
        ></textarea>
      </div>
              <button
                onClick={handleSubmitReview}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
            </>
          ) : (
            <p className="text-center text-red-500">
              You need to be logged in to rate.
            </p>
          )}
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default GPTPage;
