import React from 'react';
import '../css/admin.css';
import '../app.css';
import { useNavigate } from 'react-router-dom';

function adminproduct({ product, onDeleteSuccess }) {
    const { productID, price, image, productName } = product;
    const navigate = useNavigate();
    const shortTitle = productName.split(' ').slice(0, 3).join(' ');

    // Ürün silme işlemi
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
                        onDeleteSuccess(productID); // Ürünü listeden çıkar
                    } else {
                        window.location.reload(); // Sayfayı tamamen yenile
                    }
                } else {
                    alert('Ürün silinirken bir hata oluştu.');
                }
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
                alert('Silme işlemi başarısız oldu.');
            }
        }
    };

    return (
        <div className="product-cards-wrapper">
            <div className="infos">
                <div className="images" onClick={() => {
                    navigate(`/product-detail/${productID}`)
                }} >
                    <div >
                        <img src={image} alt={productName} />
                    </div>
                </div>
                <div className="title">{shortTitle}</div>
                <div className="price">{price}</div>
                <div className="quantity">
                    <div>15</div>
                </div>
                <div className="sales">
                    <div>15</div>
                </div>
                <div>
                    <button className="button-delete" onClick={handleDelete}>
                        Sil
                    </button>
                    <button className="button-update" onClick={() => navigate(`/update-product/${productID}`)}>
                        Güncelle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default adminproduct;
