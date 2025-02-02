import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail.css';
import { BsBasket } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, decreaseFromBasket, removeProduct } from '../redux/slices/basketSlice';
import SimilarProducts from './SimilarProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.basket.products);

  const basketProduct = products.find((product) => product.productID === Number(id));
  const count = basketProduct ? basketProduct.count : 0;

  const increment = () => {
    dispatch(addToBasket({ ...selectedProduct }));
  };

  const decrement = () => {
    if (count > 1) {
      dispatch(decreaseFromBasket({ productID: selectedProduct.productID }));
    } else if (count === 1) {
      dispatch(removeProduct({ productID: selectedProduct.productID }));
      setIsVisible(false);
    }
  };

  const getProductById = async () => {
    try {
      const response = await fetch(`https://colakandac.com.tr/api/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const addBasket = () => {
    const { productID, adetFiyat, image, productName } = selectedProduct;
    const payload = {
      productID,
      adetFiyat,
      image,
      productName,
      count: 1,
    };
    dispatch(addToBasket(payload));
    setIsVisible(true);
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  useEffect(() => {
    setIsVisible(true);
  }, [basketProduct]);

  if (!selectedProduct) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            className="product-image"
            src={selectedProduct.image}
            alt="Ürün Resmi"
          />
        </div>

        <div className="product-info">
          <div className="product-header">
            <h2 className="product-title">{selectedProduct.productName}</h2>
            <div className="product-adetFiyat">{selectedProduct.adetFiyat}₺</div>
          </div>

          <p className="product-description">
            {selectedProduct.description}
          </p>

          <div className="detail-counter">
            <button onClick={addBasket} className="add-to-cart-button">
              Sepete Ekle
              <BsBasket className="basket-icon" style={{ marginLeft: '5px' }} />
            </button>

            <div
              className="plus-minus"
              style={{
                visibility: count > 0 ? 'visible' : 'hidden',
              }}
            >
              <CiCircleMinus className="counter-icon" onClick={decrement} />
              <span className="counter-value">{count}</span>
              <CiCirclePlus className="counter-icon" onClick={increment} />
            </div>
          </div>

          <div className="adetFiyat-table-wrapper">
            <table className="adetFiyat-table">
              <thead>
                <tr>
                  <th>Koli Fiyatı</th>
                  <th>Koli Adedi</th>
                  <th>Kutu Fiyatı</th>
                  <th>Kutu Adedi</th>
                  <th>Tekli Fiyat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5₺</td>
                  <td>5 adet</td>
                  <td>5₺</td>
                  <td>10 adet</td>
                  <td>10₺</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="similar-product-container">
        <SimilarProducts categoryId={selectedProduct.categoryID} />
      </div>
    </div>
  );
};

export default ProductDetail;
