// ProductList.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import Product from './Product';
import '../css/product.css';
import '../app.css';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
    <div className="product-list">
      <div className="product-list-container">
        <h1 className="product-list-heading">Ürünlerimiz</h1>

        <p className="product-list-description">
          Lorem
        </p><p className="product-list-description">
          Lorem
        </p><p className="product-list-description">
          Lorem
        </p>

      </div>
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
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
