import React, { useState, useEffect } from 'react';
import '../css/header.css';
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { BsBasket2Fill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDrawer } from '../redux/slices/basketSlice';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { filterProducts } from '../redux/slices/productSlice';

function Header() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.basket);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSearchTerm('');
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        dispatch(filterProducts(e.target.value));
    };

    return (
        <div>
            <div onClick={() => navigate("/")}>
                <img className='logo' src="./src/images/ep.png" />
            </div>
            <div className='navbar flex-row-navbar'>
                <div className='navbar-links flex-row'>
                    <p onClick={() => navigate("/")} className='navbar-link'>Anasayfa</p>
                    <p onClick={() => navigate("/products")} className='navbar-link'>Ürünler</p>
                    <p onClick={() => navigate("/About")} className='navbar-link'>Hakkımızda</p>
                    <p onClick={() => navigate("/Contact")} className='navbar-link'>İletişim</p>
                </div>
                <div className='navbar-icons'>
                    <Box
                        sx={{ '& > :not(style)': { m: 1, width: '25ch', color: 'white', marginBottom: '25px' } }}
                    >
                        <TextField
                            style={{ color: 'white', fontSize: '25px' }}
                            id="standard-basic"
                            label="Ürün Ara.."
                            variant="standard"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                style: { color: 'white' }
                            }}
                            InputLabelProps={{
                                style: { color: 'white' }
                            }}
                        />
                    </Box>
                    <GoSearch />
                    <MdAccountCircle onClick={() => navigate("/register")} />
                    <Badge onClick={() => dispatch(setDrawer())} style={{ padding: '3px' }} badgeContent={products.length} color="warning">
                        <BsBasket2Fill />
                    </Badge>
                </div>
            </div>
        </div>
    );
}

export default Header;