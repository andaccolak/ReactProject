import '../css/product.css';
import Product from '../components/Product';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import Category from '../components/Category';

function ProductsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const dispatch = useDispatch();
    const { filteredProducts, loading } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1 className='product-page-title'>Ürünlerimiz</h1>
            <div className='product-page'>
                <div className="products">
                    <Category />
                    <div className="flex-row-product">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <Product key={product.productID} product={product} />
                            ))
                        ) : (
                            <p style={{ fontWeight: 'bold', fontSize: '25px', color: 'white' }}>Aradığınız ürün bulunamadı.</p>
                        )}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                className="pagination-number"
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;