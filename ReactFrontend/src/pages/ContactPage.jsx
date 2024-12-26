import React from 'react';
import '../css/contact.css';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

function ContactPage() {
    const space = '  ';

    return (
        <div className="contact-page">
            <h1 className="contact-page-title">İletişim</h1>
            <div className="contact-container">
                <div className="contact-form-container">
                    <div className="contact-form">
                        <div className="form-group">
                            <input type="text" className="text" placeholder="Email" />
                            <input type="text" className="text" placeholder="İsim" />
                            <input type="text" className="text" placeholder="Konu" />
                        </div>
                    </div>

                    <div className="contact-info">
                        <div>
                            <p className="info-text">
                                <FaLocationDot className="info-icon" />
                                {space}İstanbul, Türkiye
                            </p>
                            <p className="info-text">
                                <FaPhoneAlt className="info-icon" />
                                {space}05345828818
                            </p>
                            <p className="info-text">
                                <CiMail className="info-icon" />
                                {space}Example@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="contact-text">
                    <textarea
                        type="text"
                        className="text-container"
                        placeholder="Mesajınızı Yazın..."
                    />
                </div>
                <div className='contact-map'>
                    <iframe className='frame'

                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.3625207600967!2d31.786413075537382!3d41.45305199192037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409c7c7b82f54097%3A0x29f1b084da646245!2sKALE%20EKMEK%20SARAYI!5e0!3m2!1str!2str!4v1734960694878!5m2!1str!2str"

                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );

}

export default ContactPage;
