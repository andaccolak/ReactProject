import React from 'react'
import '../css/header.css'
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { BsBasket2Fill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDrawer } from '../redux/slices/basketSlice';
import { FaArrowDown } from "react-icons/fa";


function Header() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.basket)
    const navigate = useNavigate();

    console.log(products)
    console.log(products.length)

    return (
        <div>
            <div onClick={() => navigate("/")}>
                <img className='logo' src="./src/images/ep.png" />
            </div>
            <div className='navbar flex-row-navbar'>
                <div className='navbar-links flex-row'>

                    <p onClick={() => navigate("/")} className='navbar-link'>Anasayfa</p>
                    <p onClick={() => navigate("/products")} className='navbar-link'>Ürünler</p>


                    <div class="nav-item dropdown">
                        <a className="navbar-link dropdown-toggle" data-bs-toggle="dropdown">
                            Kategoriler <FaArrowDown
                                style={{ position: 'relative', top: '2px' }} />
                        </a>

                        <div class="dropdown-menu">
                            <a href="cart.html" class="dropdown-item">Cart</a>
                            <a href="chackout.html" class="dropdown-item">Chackout</a>
                            <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                            <a href="404.html" class="dropdown-item">404 Page</a>
                        </div>
                    </div>


                    <p className='navbar-link'>Hakkımızda</p>
                    <p className='navbar-link'>İletişim</p>
                </div>
                <div className='navbar-icons'>
                    <input className='navbar-input' style={{ borderRadius: '5px' }} type="text" placeholder='Ara...' name="" id="" /> <GoSearch />
                    <MdAccountCircle onClick={() => navigate("/register")} />
                    <Badge onClick={() => dispatch(setDrawer())} style={{ padding: '3px' }} badgeContent={products.length} color="warning">
                        <BsBasket2Fill />

                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header