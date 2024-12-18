import React, { useState, useEffect } from 'react';
import '../css/product.css';
import '../app.css';
import { useNavigate, useParams } from 'react-router-dom';

function Product({ product }) {
  const { id, price, image, title } = product;
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const shortTitle = title.split(' ').slice(0, 3).join(' ');

  const getProductById = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    <div className="card" onClick={()=>navigate(`/product-detail/${id}`)}>
      <img className='image' src={image} alt="" />
            <div>
                <p style={{ textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif' }}>{shortTitle}</p>
                <h3 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>{price}₺</h3>
            </div>

            <div className='flex-row'>
                <button onClick={() => navigate("/product-details/" + id)} className='detail-button'>Detayına Git</button>
            </div>
     </div>
        
  );
}

export default Product;
