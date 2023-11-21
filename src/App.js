// gpt-directory/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext'; // Adjust the path as needed

import RegistrationPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import CreatePostPage from './pages/CreatePostPage';
import ViewPostsPage from './pages/ViewPostPage';
import AccessControlTest from './pages/Test';

import HomePage from './pages/HomePage';
import SearchPage from './pages/GPTSearchPage';
import ListPage from './pages/ListPage';
import UserProfile from './pages/UserProfile';
import GPTPage from './pages/GPTPage';
import AddGPT from './pages/AddGPTPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/list" element={<ListPage/>}></Route>
        <Route path="/user/:slug" element={<UserProfile />} />
        <Route path="/chatbot/:slug" element={<GPTPage />} />

        <Route path="/addgpt" element={
          <ProtectedRoute>
            <AddGPT/>
          </ProtectedRoute>
        } />

        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/test" element={<AccessControlTest />}></Route>
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
        <Route path="/createpost" element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        } />
        <Route path="/viewposts" element={
          <ProtectedRoute>
            <ViewPostsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
