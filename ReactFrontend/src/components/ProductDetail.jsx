import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail.css';
import { BsBasket } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, decreaseFromBasket, removeProduct } from '../redux/slices/basketSlice';

function ProductDetail() {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.basket.products);

  const basketProduct = products.find((product) => product.id === Number(id));
  const count = basketProduct ? basketProduct.count : 0;

  // Artırma Fonksiyonu
  const increment = () => {
    dispatch(addToBasket({ ...selectedProduct }));
  };

  // Azaltma Fonksiyonu
  const decrement = () => {
    if (count > 1) {
      dispatch(decreaseFromBasket({ id: selectedProduct.id }));
    } else if (count === 1) {
      dispatch(decreaseFromBasket({ id: selectedProduct.id }));
      setIsVisible(false); // Ürün tamamen kaldırıldığında görünürlüğü kapat
    }
  };


  // Ürünü API'den Getirme Fonksiyonu
  const getProductById = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Sepete Ekleme Fonksiyonu
  const addBasket = () => {
    const { id, price, image, title } = selectedProduct;

    const payload = {
      id,
      price,
      image,
      title,
      count: 1, // Sepete ilk kez eklerken 1 olarak ayarla
    };

    dispatch(addToBasket(payload));
    setIsVisible(true);
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  useEffect(() => {
    if (basketProduct && basketProduct.count > 0) {
      setIsVisible(true);
    }
  }, [basketProduct]);

  if (!selectedProduct) return <div>Loading...</div>;
  return (
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
          <span className="product-title">{selectedProduct.title}</span>
          <span className="product-price">{selectedProduct.price}₺</span>
          <span style={{ marginLeft: '10px' }} className="product-weight">/Kg/Lt/Adet</span>
        </div>
        <div className="product-description">
          {selectedProduct.description}
        </div>
        <div className='detail-counter'>
          <button
            onClick={addBasket}
            className="add-to-cart-button"
          >
            Sepete Ekle
            <BsBasket style={{ marginLeft: '10px' }} />
          </button>
          <div className='plus-minus' style={{ visibility: isVisible ? 'visible' : 'hidden', display: 'flex', alignItems: 'center' }}>
            <CiCirclePlus
              onClick={increment}
              className='counter-icon' />
            <p style={{ fontSize: '30px', margin: '10px', userSelect: 'none' }}>{count}</p>
            <CiCircleMinus onClick={decrement} className='counter-icon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
