import '../css/admin.css';
import Product from '../components/adminproduct';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';

function AdminPageproduct() {
    const dispatch = useDispatch();
    const { filteredProducts } = useSelector((state) => state.product);
    const [currentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);



    return (
        <div style={{ marginLeft: '80px' }}>
            <h1 className='admin-page-title'>Ürün Yönetimi</h1>
            <div className='list'>
                <p style={{ marginLeft: '60px' }}>Görsel</p>
                <p>İsim</p>
                <p style={{ marginLeft: '40px' }}>Fiyat</p>

                <p style={{ marginLeft: '35px' }}>Stok</p>
                <p style={{ marginLeft: '30px' }}>Satış</p>
                <p style={{ marginRight: '50px' }}>İşlemler</p>




            </div>

            <div className='product-pages'> <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <Product key={product.productID} product={product} />
                    ))
                ) : (
                    <p style={{ fontWeight: 'bold', fontSize: '25px', color: 'white' }}>Aradığınız ürün bulunamadı.</p>
                )}
            </div>

            </div>
        </div>

    );
}

export default AdminPageproduct;
