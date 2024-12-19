import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../components/ProductDetail';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductsPage from '../pages/ProductsPage';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/products' element={<ProductsPage />} />
    </Routes>
  );
};

export default RouterConfig;