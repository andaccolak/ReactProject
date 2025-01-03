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
        <p style={{ color: 'black', textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif', fontSize: '18px', margin: '35px' }}>{shortTitle}</p>
        <h3 className='cards-price'>{price} ₺</h3>
      </div>
      <div className='flex-row'>
        <button onClick={() => navigate("/product-details/" + productID)} className='details-button'>Detayına Git</button>
      </div>
    </div>
  );
}

export default Product;
