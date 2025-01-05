import React from 'react'
import ProductList from '../components/ProductList';
import Productslider from '../components/Productslider';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

function Home() {
  const navigate = useNavigate();
  // Kategoriye tıklandığında ilgili sayfaya yönlendir
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };
  return (
    <div>
      <div className="home-container">
        <div className="home-info">
          <h1 className="home-title">Modanın En Yeni Adresi</h1>
          <p className="home-subtitle">
            Hayalinizdeki Stili Gerçekleştirin! En Yeni Moda Trendleri, Kalite ve
            Şıklığın Buluştuğu Adreste Sizi Bekliyor!
          </p>
          <button onClick={() => navigate("/products")} className="home-btn">
            HEMEN KEŞFET
          </button>
        </div>
      </div>

      <div className="categories">
        <div className="category-card" onClick={() => handleCategoryClick("Kadın Moda")}>
          <img src="../src/Images/bg-2.jpg" alt="" />
          <div className="category-overlay">
            <p className="category-text">Kadın Moda</p>
          </div>
        </div>

        <div className="category-card" onClick={() => handleCategoryClick("Takı")}>
          <img src="../src/Images/bg-3.jpg" alt="" />
          <div className="category-overlay">
            <p className="category-text">Takı</p>
          </div>
        </div>

        <div className="category-card" onClick={() => handleCategoryClick("Erkek Moda")}>
          <img src="../src/Images/bg-4.jpg" alt="" />
          <div className="category-overlay">
            <p className="category-text">Erkek Moda</p>
          </div>
        </div>



      </div>
      <div style={{ marginTop: '95px' }}><ProductList /></div>
      <div><Productslider /></div>
    </div>
  )
}

export default Home