import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDrawer } from '../redux/slices/basketSlice';
import { filterProducts } from '../redux/slices/productSlice';
import { MdAccountCircle } from "react-icons/md";
import { BsBasket2Fill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../css/header.css';
import LoginModal from '../modal/loginModal';
import RegisterModal from '../modal/registerModal';
import Dialog from '@mui/material/Dialog';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((store) => store.basket);

    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        setSearchTerm('');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        dispatch(filterProducts(e.target.value));
    };



    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleNavItemClick = (path) => {
        setSearchTerm('');
        dispatch(filterProducts(''));
        navigate(path);
    };

    return (
        <div>


            <div className={`navbar flex-row-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
                <div className="navbar-links">
                    <Box
                        sx={{
                            width: isMobile ? '15ch' : '35ch',
                            marginBottom: isMobile ? '5px' : '10px',
                            '@media (max-width: 480px)': {
                                margin: '0',
                            },
                        }}
                    >
                        <TextField className='searchbar'
                            style={{ color: 'black', fontSize: '20px' }}
                            id="standard-basic"
                            label="Ürün Ara.."
                            variant="standard"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                style: { color: 'black' }
                            }}
                            InputLabelProps={{
                                style: { color: 'black' }
                            }}
                        />
                    </Box>



                </div>

                <img
                    onClick={() => handleNavItemClick("/")}
                    className="logo"
                    src="../src/Images/key-tedarik-logo.svg"
                    alt="logo"
                />

                <div className="navbar-icons">
                    {/* {!isMobile && (
                        <>
                            <p onClick={() => setOpenRegister(true)} className='icon-p'>Üye Ol</p>
                            <p onClick={() => setOpenLogin(true)} className='icon-p'>Giriş Yap</p>
                        </>
                    )} */}
                    {/*<MdAccountCircle className='nav-icon'
                        onClick={() => setOpenLogin(true)}
                    />*/}
                    <Badge className='nav-icon-badge'
                        onClick={() => dispatch(setDrawer())}
                        badgeContent={products.length}
                        color="warning"
                    >
                        <BsBasket2Fill className='nav-icon' />
                    </Badge>
                </div>
            </div>
            <div className={`alt-navbar ${scrolled ? "alt-navbar-scrolled" : ""}`}>
                <p onClick={() => handleNavItemClick("/products")} className="navbar-link">Ürünler</p>
                <p onClick={() => handleNavItemClick("/About")} className="navbar-link">Hakkımızda</p>
                <p onClick={() => handleNavItemClick("/Contact")} className="navbar-link">İletişim</p>
                {!isMobile && (
                    <div className="nav-item">
                        <p className="navbar-link" onClick={toggleDropdown}>
                            Admin
                        </p>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <a
                                    className="dropdown-item"
                                    onClick={() => handleNavItemClick("/Admin-Product")}
                                >
                                    Ürün Yönetim
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => handleCategoryClick('Kategori2')}
                                >
                                    Kullanıcı Yönetim
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="#!"
                                    onClick={() => handleCategoryClick('Kategori3')}
                                >
                                    Destek Talepleri
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="#!"
                                    onClick={() => handleCategoryClick('Kategori4')}
                                >
                                    Sipariş Yönetim
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Dialog
                open={openLogin}
                onClose={() => setOpenLogin(false)}
            >
                <LoginModal closeModal={() => setOpenLogin(false)} />
            </Dialog>

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

export default Header;
