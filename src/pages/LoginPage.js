import React, { useState } from "react";
import supabase from "../supabase/supabaseClient";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the path as needed
import Navbar from "../components/navbar";
import Container from "../components/Container";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging in:", error);
      return;
    }
    console.log(data.session.user);
    setUser(data.session.user);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Navigate to="/account" />;
  }

  return (
    <Container>
      <div className="flex items-center justify-center flex-col">
        <div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={loginUser} className="space-y-6">
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
              Login
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
