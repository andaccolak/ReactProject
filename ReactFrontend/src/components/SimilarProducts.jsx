import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SimilarProducts({ categoryId }) {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const response = await axios.get(`https://localhost:7240/api/Products/GetSimilarProducts/${categoryId}`);
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching similar products:', error);
            }
        };

        if (categoryId) {
            fetchSimilarProducts();
        }
    }, [categoryId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Container className="product-slider-container">
            <h1 className="product-slider-heading" style={{ fontFamily: 'arial' }}>Benzer Ürünlerimiz</h1>
            <Slider {...settings} className='slider'>
                {cards.map((card) => {
                    const shortTitle = card.productName
                        .split(' ')
                        .slice(0, 3)
                        .join(' ');
                    return (
                        <Card key={card.productID} className='card'>
                            <img className='image' src={card.image} alt={card.productName} />
                            <div>
                                <p style={{ margin: '-5px', color: 'black', textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif', fontSize: '20px' }}>
                                    {shortTitle}
                                </p>
                                <h3 className='card-price'>{card.price} ₺ / Kg</h3>
                            </div>
                            <div className='flex-row'>
                                <button onClick={() => navigate("/product-detail/" + card.productID)} className='detail-button'>
                                    Detayına Git
                                </button>
                            </div>
                        </Card>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default SimilarProducts;
