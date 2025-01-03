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

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((store) => store.basket);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setSearchTerm('');
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        dispatch(filterProducts(e.target.value));
    };

    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${categoryName}`);
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


            <div className="navbar flex-row-navbar">
                <div className="navbar-links flex-row">
                    <img style={{ marginTop: '13px' }} onClick={() => handleNavItemClick("/")} className="logo" src="./src/images/logo2.png" alt="Logo" />

                    <p onClick={() => handleNavItemClick("/")} className="navbar-link">Anasayfa</p>
                    <p onClick={() => handleNavItemClick("/products")} className="navbar-link">Ürünler</p>
                    <p onClick={() => handleNavItemClick("/About")} className="navbar-link">Hakkımızda</p>
                    <p onClick={() => handleNavItemClick("/Contact")} className="navbar-link">İletişim</p>

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
                </div>

                <div className="navbar-icons">
                    <Box
                        sx={{
                            '& > :not(style)': {
                                m: 1,
                                width: '15ch',
                                color: 'white',
                                marginBottom: '20px'
                            }
                        }}
                    >
                        <TextField
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

                    <MdAccountCircle
                        style={{ color: 'rgb(69, 69, 87)', fontSize: '25px', cursor: 'pointer' }}
                        onClick={() => handleNavItemClick("/register")}
                    />

                    <Badge
                        onClick={() => {
                            setSearchTerm('');
                            dispatch(filterProducts(''));
                            dispatch(setDrawer());
                        }}
                        style={{ padding: '3px', cursor: 'pointer' }}
                        badgeContent={products.length}
                        color="warning"
                    >
                        <BsBasket2Fill style={{ color: 'rgb(74, 74, 103)', fontSize: '25px' }} />
                    </Badge>
                </div>
            </div>
        </div>
    );
}

export default Header;