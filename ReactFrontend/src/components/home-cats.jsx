import React from 'react';
import '../css/homeCats.css';
import { useNavigate } from 'react-router-dom';

function HomeCats() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        // Burada kategoriye göre yönlendirme yapabilirsiniz
        navigate(`/products?category=${category}`);
    };

    return (
        <div className="home-cats-container">
            <div
                className="home-cats-item"
                onClick={() => handleCategoryClick("Kadın Moda")}
            >
                <div className="category">Kadın Moda</div>
            </div>
            <div
                className="home-cats-item"
                onClick={() => handleCategoryClick('erkek')}
            >
                <div className="category">Erkek Moda</div>
            </div>
            <div
                className="home-cats-item"
                onClick={() => handleCategoryClick('cocuk')}
            >
                <div className="category">Çocuk Moda</div>
            </div>
            <div
                className="home-cats-item"
                onClick={() => handleCategoryClick('aksesuar')}
            >
                <div className="category">Aksesuarlar</div>
            </div>
        </div>
    );
}

export default HomeCats;
