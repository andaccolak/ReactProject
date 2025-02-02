import React from 'react'
import ProductList from '../components/ProductList';
import Productslider from '../components/Productslider';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import HomeBanner from '../components/HomeBanner';
import DiscountProductList from '../components/discountProductList';
import Brands from '../components/Brands';


function Home() {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };
  return (
    <div>
      <HomeBanner />


      <div><Productslider /></div>
      <Brands />

      <div style={{ marginTop: '95px' }}><DiscountProductList /></div>

    </div>
  )
}

export default Home