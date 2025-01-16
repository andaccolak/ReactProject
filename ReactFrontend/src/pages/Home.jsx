import React from 'react'
import ProductList from '../components/ProductList';
import Productslider from '../components/Productslider';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import HomeCats from '../components/home-cats';

function Home() {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };
  return (
    <div>
      <HomeCats />


      <div><Productslider /></div>

      <div style={{ marginTop: '95px' }}><ProductList /></div>
    </div>
  )
}

export default Home