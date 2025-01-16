import '../css/product.css';
import Product from '../components/Product';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import Category from '../components/Category';
import ProductsPageList from '../components/productsPageList';

function ProductsPage() {

    return (
        <div>
            <Category />
            <ProductsPageList />
        </div>
    );
}

export default ProductsPage;