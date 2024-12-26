import '../css/product.css';
import Product from '../components/Product';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import { FaSortAmountDown } from "react-icons/fa";
import Category from '../components/Category';

function ProductsPage() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

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
                        {currentProducts.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
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