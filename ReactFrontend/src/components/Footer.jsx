import React, { useState, useEffect } from 'react';
import '../css/footer.css';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../modal/registerModal';
import Dialog from '@mui/material/Dialog';

function Footer() {
    const navigate = useNavigate();
    const [openRegister, setOpenRegister] = useState(false);

    return (
        <div className='footer-container'>
            <div className='footer-info'><h1>Bilgi</h1>
                <div style={{ fontSize: '20px' }} className='footer-info-links'>
                    <div onClick={() => navigate("/contact")} className='link'>İletişim</div>
                    <div onClick={() => navigate("/about")} className='link'>Hakkımızda</div>
                    <div className='link'>Sık Sorular Sorular</div>
                    <div className='link'>Politikalarımız</div>
                </div>
            </div>

            <div className='footer-acc'><h1>Hesap</h1>
                <div style={{ fontSize: '20px' }} className='footer-info-links'>
                    <div onClick={() => setOpenRegister(true)} className='link'>Hesabım</div>
                    <div onClick={() => setOpenRegister(true)} className='link'>Sipariş Geçmişim</div>
                    <div onClick={() => setOpenRegister(true)} className='link'>Destek Taleplerim</div>
                </div>
            </div>
            <div className='footer-contact'><h1>İletişim</h1>
                <div style={{ fontSize: '20px' }} className='footer-info-links'>
                    <div className='link'>Address: 1429 Netus Rd, NY 48247
                    </div>
                    <div className='link'>Email: Example@gmail.com
                    </div>
                    <div className='link'>Phone: +0123 4567 8910</div>
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