import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route 
        path="/posts/new" 
        element={
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/posts/edit/:id" 
        element={
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;