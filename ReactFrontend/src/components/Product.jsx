import React from 'react';
import '../css/product.css';
import '../app.css';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
  const { productID, price, image, productName } = product;
  const navigate = useNavigate();
  const shortTitle = productName.split(' ').slice(0, 3).join(' ');

  return (
    <div className="cards" onClick={() => {
      navigate(`/product-detail/${productID}`);
    }}>
      <img className='image' src={image} alt="" />
      <div>
        <p style={{ color: 'black', textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '18px', marginTop: '35px' }}>{shortTitle}</p>
        <h1 className='cards-price'>{price} ₺</h1>
      </div>
      <div className='flex-row'>
        <button onClick={() => navigate("/product-details/" + productID)} className='details-button'>Ürünü İncele</button>
      </div>
    </div>
  );
}

export default Product;
