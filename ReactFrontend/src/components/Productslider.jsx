import React, { useState } from 'react';
import '../css/product.css';

function Productslider() {
    const [currentIndex, setCurrentIndex] = useState(0);


    //apiden çekilen verilerde filtreleme yapılarak doldurulacak
    const sliderData = [
        'https://via.placeholder.com/300x200.png?text=Gorsel+1',
        'https://via.placeholder.com/300x200.png?text=Gorsel+2',
        'https://via.placeholder.com/300x200.png?text=Gorsel+3',
        'https://via.placeholder.com/300x200.png?text=Gorsel+4',
        'https://via.placeholder.com/300x200.png?text=Gorsel+5',
        'https://via.placeholder.com/300x200.png?text=Gorsel+6',
        'https://via.placeholder.com/300x200.png?text=Gorsel+7',
        'https://via.placeholder.com/300x200.png?text=Gorsel+8',
        'https://via.placeholder.com/300x200.png?text=Gorsel+9'
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + sliderData.length) % sliderData.length);
    };

    const visibleSlides = [
        sliderData[currentIndex],
        sliderData[(currentIndex + 1) % sliderData.length],
        sliderData[(currentIndex + 2) % sliderData.length]
    ];

    return (
        <div className='SliderContainer'>
            <h1 className='SliderTitle'>Çok Satanlar</h1>
            <div className='cardContainer'>
                <button className='sliderButton' onClick={prevSlide}>{'<'}</button>
                {visibleSlides.map((image, index) => (
                    <div className='SliderCard' key={index}>
                        <img src={image} alt={`Görsel ${currentIndex + index + 1}`} className='sliderImage' />
                    </div>
                ))}
                <button className='sliderButton' onClick={nextSlide}>{'>'}</button>
            </div>
        </div>
    );
}

export default Productslider;
