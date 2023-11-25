// gpt-directory/src/pages/Register.js
import React, { useState } from "react";
import supabase from "../supabase/supabaseClient";
import Navbar from "../components/navbar";
import Container from "../components/Container";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await supabase.auth.signUp({ email, password });
    console.log("SignUp Response:", response);

    const { user, error } = response.data;
    if (error) console.error("Error registering:", error);
    else console.log("User registered:", user);

    const { data, insertError } = await supabase
      .from("user_profiles")
      .insert([{ id: user.id /* other default profile fields */ }]);

    if (insertError) {
      console.error("Error creating user profile:", insertError);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center flex-col">
        <div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome!</h1>
            <p className="text-sm text-gray-600">Create a new account.</p>
          </div>
          <form onSubmit={registerUser} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded;"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegistrationPage;
