// src/components/Category.jsx

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryService from "../services/CategoryService";
import { getAllProduct, setProducts } from "../redux/slices/productSlice";
import "../css/category.css";

function Category() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Kategorileri ve ürünleri çek
        CategoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) =>
                console.error("Kategori çekme işlemi başarısız oldu:", error)
            );

        dispatch(getAllProduct()).then((response) => setAllProducts(response.payload));

        // Ekran boyutunu dinleyerek mobil durumu belirle
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    // Kategori seçildiğinde ürünleri filtrele
    useEffect(() => {
        if (selectedCategory === null) {
            dispatch(setProducts(allProducts));
        } else {
            const filteredProducts = allProducts.filter(
                (product) => product.categoryName === selectedCategory
            );
            dispatch(setProducts(filteredProducts));
        }
    }, [selectedCategory, allProducts, dispatch]);

    const handleButtonClick = (categoryName) => {
        setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
    };

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue === "all" ? null : selectedValue);
    };

    return (
        <>
            {/* Masaüstü görünümünde kategori butonları */}
            {!isMobile && (
                <div className="category-list">
                    {categories.map((category) => (
                        <button
                            key={category.categoryID}
                            className={`category-button ${selectedCategory === category.categoryName ? "active" : ""
                                }`}
                            onClick={() => handleButtonClick(category.categoryName)}
                        >
                            {category.categoryName}
                        </button>
                    ))}
                </div>
            )}

            {/* Mobil görünümde dropdown */}
            {isMobile && (
                <div className="dropdown-category">
                    <select
                        className="dropdown-select"
                        value={selectedCategory || "all"}
                        onChange={handleDropdownChange}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.categoryID} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
}

export default Category;
