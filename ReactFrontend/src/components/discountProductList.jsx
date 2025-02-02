import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import Product from './Product';
import '../css/product.css';
import '../app.css';
import DiscountProduct from './discountProduct';

function DiscountProductList() {
    const dispatch = useDispatch();
    const { filteredProducts, loading } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const productList = document.querySelector('.product-list');
        if (productList) {
            productList.classList.add('hidden');
            observer.observe(productList);
        }

        return () => observer.disconnect();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="product-list">
            <div className="product-list-container">
                <h1 className="product-list-heading">Kampanyalı Ürünler</h1>
            </div>
            <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <DiscountProduct key={product.productID} product={product} />
                    ))
                ) : (
                    <p style={{ fontWeight: 'bold', fontSize: '25px', color: 'white' }}>Aradığınız ürün bulunamadı.</p>
                )}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            style={{
                                cursor: 'pointer',
                                padding: '5px',
                                margin: '5px',
                                borderRadius: '15px',
                                border: 'none',
                                backgroundColor: 'lightgray',
                                fontSize: '15px',
                            }}
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className='pagination-number'
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DiscountProductList;
