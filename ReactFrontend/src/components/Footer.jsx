import React, { useState, useEffect } from 'react';
import '../css/footer.css';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../modal/registerModal';
import Dialog from '@mui/material/Dialog';

function Footer() {
    const navigate = useNavigate();
    const [openRegister, setOpenRegister] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='footer-container'>
            <div className='footer-info'>
                <h1 className='footer-title'>Bilgi</h1>
                <div className='footer-info-links'>
                    <div onClick={() => navigate("/contact")} className='link'>İletişim</div>
                    <div onClick={() => navigate("/about")} className='link'>Hakkımızda</div>
                    {!isMobile && <div className='link'>SSS</div>}
                    {!isMobile && <div className='link'>Politikalar</div>}
                </div>
            </div>

            <div className='footer-acc'>
                <h1 className='footer-title'>Hesap</h1>
                <div className='footer-info-links'>
                    <div onClick={() => setOpenRegister(true)} className='link'>Hesabım</div>
                    <div onClick={() => setOpenRegister(true)} className='link'>Sipariş</div>
                    {!isMobile && <div onClick={() => setOpenRegister(true)} className='link'>Destek</div>}
                </div>
            </div>

            <div className='footer-contact'>
                <h1 className='footer-title'>İletişim</h1>
                <div className='footer-info-links'>
                    {isMobile ? (
                        <>
                            <div className='link'>NY</div>
                            <div className='link'>info@ex.com</div>
                            <div className='link'>+012345</div>
                        </>
                    ) : (
                        <>
                            <div className='link'>Address: 1429 Netus Rd, NY 48247</div>
                            <div className='link'>Email: Example@gmail.com</div>
                            <div className='link'>Phone: +0123 4567 8910</div>
                        </>
                    )}
                </div>
            </div>

            <Dialog
                open={openRegister}
                onClose={() => setOpenRegister(false)}
            >
                <RegisterModal
                    closeModal={() => setOpenRegister(false)}
                />
            </Dialog>
        </div>
    );
}

export default Footer;