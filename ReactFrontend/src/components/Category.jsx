import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../services/CategoryService";
import { getAllProduct, setProducts } from "../redux/slices/productSlice";
import "../css/category.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";

function Category() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        CategoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error("Kategori çekme işlemi başarısız oldu:", error));

        dispatch(getAllProduct()).then((response) => setAllProducts(response.payload));
    }, [dispatch]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get("category");

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [location.search]);

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
        setSelectedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
    };

    return (
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
    );
}

export default Category;
