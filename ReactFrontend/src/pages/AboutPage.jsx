import React from 'react';
import '../css/about.css';
import '../css/pages.css';
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";

function AboutPage() {
    return (
        <div >
            <h1 className='about-page-title'>Hakkımızda</h1>
            <div className='about-us'>
                <div className='about-us-title'><h1>Biz Kimiz?</h1></div>
                <div className='about-us-text'>
                    Biz, müşteri memnuniyetini ve güvenilir alışveriş deneyimini merkezine alan bir e-ticaret platformuyuz. Her biri alanında uzman, dinamik ve yenilikçi ekibimizle, müşterilerimize sadece ürün satmıyor, aynı zamanda güncel trendleri yakından takip ederek onların beklentilerine uygun çözümler üretiyoruz. Geniş ürün yelpazemizle, ihtiyaçlarınızı tek bir noktada karşılayarak zamandan tasarruf etmenizi sağlarken; hızlı kargo, güvenli ödeme ve etkili müşteri desteği gibi hizmetlerimizle alışverişinizi zahmetsiz ve keyifli bir deneyime dönüştürmeyi hedefliyoruz. Biz, kaliteyi ve güveni ön planda tutarak, alışverişin yeni nesil adresi olmaya kararlıyız.
                </div>
            </div>

            <div className='icon-container'>
                <div className='icon-item'>
                    <div className='icon'><FaShippingFast /></div>
                    <p className='icon-text'>Hızlı Kargo</p>
                </div>
                <div className='icon-item'>
                    <div className='icon'><RiSecurePaymentLine /></div>
                    <p className='icon-text'>Güvenli Ödeme</p>
                </div>
                <div className='icon-item'>
                    <div className='icon'><RiRefund2Line /></div>
                    <p className='icon-text'>İade Garantisi</p>
                </div>
                <div className='icon-item'>
                    <div className='icon'><MdOutlineContactSupport /></div>
                    <p className='icon-text'>7/24 Destek</p>
                </div>
            </div>

            <div className='goal'>
                <div className='our-goal'>
                    <div className='goal-title'><h1>Amacımız</h1></div>
                    <div className='goal-text'>
                        Amacımız, müşterilerimize her aşamada yüksek kalite, güvenilirlik ve memnuniyet sunan bir alışveriş deneyimi yaşatmaktır. Bu doğrultuda, zengin ürün yelpazemizle çeşitli ihtiyaçlara cevap verirken, hızlı teslimat, güvenli ödeme yöntemleri ve etkin müşteri desteği gibi unsurlarla hizmet kalitemizi sürekli olarak ileri taşımayı hedefliyoruz. İnovasyon ve gelişime açık yaklaşımımızla, güncel trendleri takip ediyor, kullanıcı dostu arayüzümüz sayesinde alışveriş sürecini en pratik ve keyifli hale getiriyoruz. Bizi tercih eden müşterilerimize, beklentilerinin ötesinde bir değer sunmak için her gün daha iyi olmaya gayret ediyoruz.
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutPage;
