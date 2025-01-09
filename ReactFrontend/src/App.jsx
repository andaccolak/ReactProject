import './App.css'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, removeProduct } from './redux/slices/basketSlice.jsx'
import Footer from './components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const basketAmount = totalAmount.toFixed(2);
  const dispatch = useDispatch();
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);
  useEffect(() => {
    dispatch(calculateBasket());
  }, [products]);

  return (

    <div>

      {/* <PageContainer style={{ display: 'flex', flexDirection: 'column', width: '100%' }}> */}
      <Loading />
      <Header />
      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Drawer onClose={() => dispatch(setDrawer())} className='drawer' sx={{ padding: '20px' }} anchor='right' open={drawer} >
        {
          products && products.map((product) => {
            return (
              <div key={product.productID}>
                <div className='flex-row' style={{ padding: '20px', cursor: 'pointer' }}>
                  <img onClick={() => {
                    navigate(`/product-detail/${product.productID}`);
                  }} style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                  <p onClick={() => {
                    navigate(`/product-detail/${product.productID}`);
                  }} style={{ width: '320px', marginRight: '5px', color: 'black' }}>{product.productName} <br />
                    Adet : {product.count}</p>
                  <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price}TL</p>
                  <button onClick={() => dispatch(removeProduct({ productID: product.productID }))} style={{ padding: '5px', borderRadius: '5px', backgroundColor: 'rgb(185, 76, 76)', border: 'none', color: '#fff', width: '50px', cursor: 'pointer' }}>sil</button>
                </div>


              </div>
            )
          })
        }
        <div>

          {totalAmount > 0 && (
            <p style={{
              textAlign: 'center', margin: '25px', backgroundColor: '#7e82b5', color: 'white'
              , padding: '10px', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold'
            }}> toplam tutar : {basketAmount} ₺</p>
          )}
        </div>
        <div>


          {totalAmount > 0 && (
            <button style={{

              textAlign: 'center', marginLeft: '180px',
              marginBottom: '50px', backgroundColor: '#7e82b5', color: 'white', cursor: 'pointer'
              , padding: '10px', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold'
            }} onClick={() => navigate('/payment')}> Ödeme Ekranına Git</button>)}

          {totalAmount == 0 && (
            <p style={{ margin: '50px' }}>Sepetiniz boş</p>
          )}
        </div>

      </Drawer >
      <Footer />
      {/* </PageContainer> */}
      {
        showScroll && (
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "RGBA(0,123,255,045)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            ↑
          </button>
        )
      }
    </div >

  )
}

export default App
