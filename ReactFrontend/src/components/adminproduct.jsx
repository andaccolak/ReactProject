import React, { useState } from 'react';
import '../css/admin.css';
import '../app.css';

function adminproduct({ product, onDeleteSuccess }) {
    const { productID, productName, price, description, image, categoryId, categoryName, brand, salesType, quantity, sales } = product;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        productName,
        price,
        description,
        image,
        categoryId,
        categoryName,
        brand,
        salesType,
        sales,
        quantity

    });
    const shortTitle = productName.split(' ').slice(0, 3).join(' ');
    const handleDelete = async () => {
        const confirmDelete = window.confirm(`${productName} adlı ürünü silmek istediğinize emin misiniz?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`https://localhost:7240/api/Products/${productID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Ürün başarıyla silindi.');
                    if (onDeleteSuccess) {
                        onDeleteSuccess(productID);
                        window.location.reload();
                    }
                } else {
                    alert('Ürün silinirken bir hata oluştu.');
                }
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
                alert('Silme işlemi başarısız oldu.');
            }
            finally {
                window.location.reload();
            }
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://localhost:7240/api/Products`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID,
                    ...updatedProduct,
                }),
            });

            if (response.ok) {
                alert('Ürün başarıyla güncellendi.');
                setIsEditing(false);
                window.location.reload();

            } else {
                alert('Ürün güncellenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Güncelleme işlemi sırasında bir hata oluştu:', error);
            alert('Güncelleme işlemi başarısız oldu.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="product-cards-wrapper">
            {!isEditing ? (
                <div className="infos">
                    <div className="images">
                        <img src={image} alt={productName} />
                    </div>
                    <div className="title">{productName}</div>
                    <div className="price">${price}</div>
                    <div className="quantity"> {quantity}</div>
                    <div className="sales"> {sales}</div>
                    <div>
                        <button className="button-delete" onClick={handleDelete}>
                            Sil
                        </button>
                        <button className="button-update" onClick={() => setIsEditing(true)}>
                            Güncelle
                        </button>
                    </div>
                </div>
            ) : (
                <div className="update-form">
                    <input
                        type="text"
                        name="productName"
                        value={updatedProduct.productName}
                        onChange={handleChange}
                        placeholder="Ürün Adı"
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price}
                        onChange={handleChange}
                        placeholder="Fiyat"
                    />
                    <input
                        type="text"
                        name="description"
                        value={updatedProduct.description}
                        onChange={handleChange}
                        placeholder="Açıklama"
                    />
                    <input
                        type="text"
                        name="image"
                        value={updatedProduct.image}
                        onChange={handleChange}
                        placeholder="Görsel URL"
                    />
                    <input
                        type="number"
                        name="categoryId"
                        value={updatedProduct.categoryId}
                        onChange={handleChange}
                        placeholder="Kategori Id"
                    />
                    <input
                        type="text"
                        name="categoryName"
                        value={updatedProduct.categoryName}
                        onChange={handleChange}
                        placeholder="Kategori İsmi"
                    />
                    <input
                        type="text"
                        name="brand"
                        value={updatedProduct.brand}
                        onChange={handleChange}
                        placeholder="Marka"
                    />
                    <input
                        type="text"
                        name="salesType"
                        value={updatedProduct.salesType}
                        onChange={handleChange}
                        placeholder="Satış Tipi"
                    />
                    <input
                        type="number"
                        name="sales"
                        value={updatedProduct.sales}
                        onChange={handleChange}
                        placeholder="Satış Sayısı"
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={updatedProduct.quantity}
                        onChange={handleChange}
                        placeholder="Stok"
                    />
                    <button className="button-save" onClick={handleUpdate}>
                        Kaydet
                    </button>
                    <button className="button-cancel" onClick={() => setIsEditing(false)}>
                        İptal
                    </button>
                </div>
            )}
        </div>
    );
}

export default adminproduct;
