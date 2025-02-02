
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function BrandSlider() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
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
                const response = await axios.get('https://colakandac.com.tr/api/brand/list');
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
            <Container className="product-slider-container ">
                <h1 className="product-slider-heading">Markalarımız</h1>
                <div className="loading-placeholder">
                    Markalar Yükleniyor...
                </div>
            </Container>
        );
    }

    if (cards.length === 0) {
        return null;
    }

    return (
        <Container className="product-slider-container ">
            <h1 className="product-slider-heading">Markalarımız </h1>
            <Slider {...settings} className='slider'>
                {cards.map((card) => {
                    return (
                        <Card key={card.brandID} className='card'>
                            <img style={{ marginTop: '50px', width: '350px' }} className='image' src={card.imageURL} alt={card.brandName} />
                            {/* <div>
                                <h1 style={{ margin: '15px', color: 'black', textAlign: 'center', height: '20px', fontFamily: 'Arial, sans-serif', fontSize: '15px' }}>{card.brandName}</h1>
                            </div> */}

                        </Card>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default BrandSlider;
