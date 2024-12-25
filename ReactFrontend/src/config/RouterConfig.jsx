import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../components/ProductDetail';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import AdminPageProduct from '../pages/AdminPageProduct';
const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/About' element={<AboutPage />} />
      <Route path='/Contact' element={<ContactPage />} />
      <Route path='Admin-Product' element={<AdminPageProduct />} />
    </Routes>
  );
};

export default RouterConfig;