import React from 'react'
import '../css/header.css'
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { BsBasket2Fill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDrawer } from '../redux/slices/basketSlice';


function Header() {    
    const dispatch = useDispatch();
    const{products} = useSelector((store)=>store.basket)
    const navigate = useNavigate();

    console.log(products)  
      console.log(products.length)

  return (
    <div>
        <div onClick={() => navigate("/")}>
            <img className='logo' src="./src/images/logo1.png"/>
        </div>
        <div className='navbar flex-row-navbar'>
            <div className='navbar-links flex-row'>
                <p className='navbar-link'>Anasayfa</p>
                <p className='navbar-link'>Ürünler</p>
                <p className='navbar-link'>Kategoriler</p>
                <p className='navbar-link'>Hakkımızda</p>
                <p className='navbar-link'>İletişim</p>
            </div>
            <div className='navbar-icons'>
                <input className='navbar-input' style={{borderRadius: '5px'}} type="text" placeholder='Ara...' name="" id="" /> <GoSearch />
                <MdAccountCircle />
                <Badge onClick={()=> dispatch(setDrawer())} style={{padding:'3px'}} badgeContent={products.length} color="warning">
                <BsBasket2Fill />

                </Badge>
            </div>
        </div>
    </div>
  )
}

export default Header