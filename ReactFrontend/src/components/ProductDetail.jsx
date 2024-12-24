import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail.css';
import { BsBasket } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, decreaseFromBasket, removeProduct } from '../redux/slices/basketSlice';

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
      const response = await fetch(`https://localhost:7240/api/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const addBasket = () => {
    const { productID, price, image, productName } = selectedProduct;

    const payload = {
      productID,
      price,
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

  if (!selectedProduct) return <div>Loading...</div>;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img className="product-image" src={selectedProduct.image} alt="Ürün Resmi" />
      </div>
      <div className="product-info">
        <div className="product-header">
          <span className="product-title">{selectedProduct.productName}</span>
          <span className="product-price">{selectedProduct.price}₺</span>
          <span style={{ marginLeft: '10px' }} className="product-weight">/Kg/Lt/Adet</span>
        </div>
        <div className="product-description">{selectedProduct.description}</div>
        <div className="detail-counter">
          <button onClick={addBasket} className="add-to-cart-button">
            Sepete Ekle
            <BsBasket style={{ marginLeft: '10px' }} />
          </button>
          <div
            className="plus-minus"
            style={{
              visibility: count > 0 ? 'visible' : 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CiCirclePlus onClick={increment} className="counter-icon" />
            <p style={{ fontSize: '30px', margin: '10px', userSelect: 'none', color: 'white' }}>{count}</p>
            <CiCircleMinus onClick={decrement} className="counter-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
