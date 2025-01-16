import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Container, Card } from 'react-bootstrap';
import '../css/productslider.css';
import { useNavigate } from 'react-router-dom';

function Productslider() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
                }
            }
        ]
    };

    useEffect(() => {
        let mounted = true;

        const fetchBestSellingProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7240/api/Products/bestseller');
                if (mounted) {
                    setCards(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching best-selling products:', error);
                setIsLoading(false);
            }
        };

        fetchBestSellingProducts();

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sliderElement = document.querySelector('.product-slider-container');
        if (sliderElement) observer.observe(sliderElement);

        return () => {
            mounted = false;
        };
    }, []);

    if (isLoading) {
        return (
            <Container className="product-slider-container hidden">
                <h1 className="product-slider-heading">Çok Satanlar</h1>
                <div className="loading-placeholder">
                    Ürünler Yükleniyor...
                </div>
            </Container>
        );
    }

    if (cards.length === 0) {
        return null;
    }

    return (
        <Container className="product-slider-container hidden">
            <h1 className="product-slider-heading">Çok Satanlar</h1>
            <Slider {...settings} className='slider'>
                {cards.map((card) => {
                    const shortTitle = card.productName.split(' ').slice(0, 3).join(' ');
                    return (
                        <Card key={card.productID} className='card'>
                            <img className='image' src={card.image} alt={card.productName} />
                            <div>
                                <p style={{ margin: '-5px', color: 'black', textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif', fontSize: '15px' }}>{shortTitle}</p>
                                <h3 className='card-price'>{card.price} ₺ </h3>
                            </div>
                            <div className='flex-row'>
                                <button onClick={() => navigate("/product-detail/" + card.productID)} className='detail-button'>Ürünü İncele</button>
                            </div>
                        </Card>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default Productslider;