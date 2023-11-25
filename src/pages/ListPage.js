import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import supabase from "../supabase/supabaseClient";

import Container from "../components/Container";

// Skeleton Component
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-48 flex flex-col justify-between animate-pulse">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
);

const ListPage = () => {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // State to track loading status

  const handleVisitClick = async (chatbotId) => {
    try {
      const { data, error } = await supabase
        .from("click_tracking") // Replace with your table name
        .insert([
          { chatbot_id: chatbotId, user_id: user?.id, source: "search" },
        ]);

      if (error) throw error;
      // Optionally, you can do something with the response data
    } catch (err) {
      console.error("Error logging click:", err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("gpt_list").select("*");

        if (error) {
          setError(error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Split data into featured and regular items
  const featuredItems = data.filter((item) => item.isfeatured);
  const regularItems = data.filter((item) => !item.isfeatured);

  const renderRating = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-300" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
      {rating == null ? (
        <p className="ml-1 text-sm font-medium text-gray-500"> Unrated</p>
      ) : (
        <>
          <p className="ml-1 text-sm font-medium text-gray-500">
            {rating.toFixed(2)}
          </p>
          <p className="ml-1 text-sm font-medium text-gray-500">out of</p>
          <p className="ml-1 text-sm font-medium text-gray-500">5</p>
        </>
      )}
    </div>
  );

  const renderItem = (item, index) => (
    <li
      key={index}
      className="bg-white p-4 rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-48 flex flex-col justify-between"
    >
      <div>
        <h3 className="font-semibold text-lg text-gray-900 truncate">
          <a href={item.link}>{item.name}</a>
        </h3>
        <p className="text-gray-600 text-sm overflow-ellipsis overflow-hidden h-14">
          {item.description}
        </p>
      </div>
      <div>
        {renderRating(item.rating)}
        <a
          href={"/chatbot/" + item.slug}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            onClick={() => handleVisitClick(item.id)}
            style={{
              background: "linear-gradient(to bottom right, #fdc5f5, #72ddf7)",
            }}
            className="text-white font-bold py-2 px-4 rounded mt-2"
          >
            Visit
          </button>
        </a>
      </div>
    </li>
  );

  return (
    <Container>
      {error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : (
        <>
          {/* Featured Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Featured GPTs
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array(2)
                  .fill()
                  .map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featuredItems.map(renderItem)}
              </ul>
            )}
          </div>

          {/* Regular Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">All GPTs</h2>

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array(4)
                  .fill()
                  .map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {regularItems.map(renderItem)}
              </ul>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default ListPage;
