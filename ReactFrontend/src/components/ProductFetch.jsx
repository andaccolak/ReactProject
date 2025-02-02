import React, { useEffect } from "react";

function ProductFetch() {
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://colakandac.com.tr/api/Products/list");
                const data = await response.json();
                console.log("Gelen Veri:", data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Ürün Listesi</h1>
        </div>
    );
}

export default ProductFetch;
