import React from 'react'
import ProductList from '../components/ProductList';
import Productslider from '../components/Productslider';
import Category from '../components/Category';
function Home() {
  return (
    <div>
      <div>
        <Category />
        <div><ProductList /></div>
        <div><Productslider /></div>
      </div>
    </div >
  )
}

export default Home