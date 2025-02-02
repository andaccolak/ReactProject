import React from 'react';
import '../css/product.css';
import '../app.css';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
  const { productID, productName, description, image, categoryID, categoryName, brand, salesType, sales, quantity, gram, paketIciAdet, koliIciAdet, adetFiyat, barkodNo, discount } = product;
  const navigate = useNavigate();
  const shortTitle = productName.split(' ').slice(0, 3).join(' ');

  return (
    <div
      className="Discount-cards"
      onClick={() => navigate(`/product-detail/${productID}`)}
    >

      {discount > 0 && (
        <div className="discount-badge">
          %{discount}
        </div>
      )}



      <img className="Discount-image" src={image} alt={shortTitle} />
      <div>
        <p
          style={{
            color: 'black',
            textAlign: 'center',
            height: '20px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '18px',
            marginTop: '35px'
          }}
        >
          {shortTitle}
        </p>
        <h1 className="Discount-cards-adetFiyat">{adetFiyat} ₺</h1>
      </div>
      <div className="flex-row">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Kart tıklamasından ayrıştırmak için
            navigate(`/product-detail/${productID}`);
          }}
          className="Discount-details-button"
        >
          Ürünü İncele
        </button>
      </div>
    </div>
  );
}

export default Product;
