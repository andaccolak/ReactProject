import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';
const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default RouterConfig;