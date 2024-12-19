import '../css/product.css';
import Product from '../components/Product';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import { FaSortAmountDown } from "react-icons/fa";

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
                <div className='sort-filter'>
                    <div style={{ marginLeft: '50px', color: '#7e82b5', fontSize: '30px' }}>
                        <FaSortAmountDown />
                    </div>

                    <div>
                        <p className='Category'>Kategori1</p>
                        <p className='Category'>Kategori2</p>
                        <p className='Category'>Kategori3</p>
                        <p className='Category'>Kategori4</p>
                        <p className='Category'>Kategori5</p>


                    </div>
                </div>
                <div className='products'>
                    <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
                        {currentProducts.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}>
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