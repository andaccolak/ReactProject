// src/pages/ProductsPage.jsx
import React from "react";
import Category from "../components/Category";
import ProductsPageList from "../components/ProductsPageList";
import "../css/ProductPage.css"

function ProductsPage() {
    return (
        <div className="products-page-container">
            <div className="sidebar-category">
                <Category />
            </div>
            <div className="products-content">
                <ProductsPageList />
            </div>
        </div>
    );
}

export default ProductsPage;
