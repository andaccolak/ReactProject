import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../services/CategoryService";
import { getAllProduct, setProducts } from "../redux/slices/productSlice";
import "../css/category.css";

function Category() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));

        dispatch(getAllProduct())
            .then((response) => setAllProducts(response.payload))
            .catch((error) => console.error("Error fetching products:", error));
    }, [dispatch]);

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
        setSelectedCategory((prevCategory) =>
            prevCategory === categoryName ? null : categoryName
        );
    };

    return (
        <div className="category-container">
            <h2>Kategoriler</h2>
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
        </div>
    );
}

export default Category;
