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
  const dispatch = useDispatch();

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
                <div onClick={() => {
                  navigate(`/product-detail/${product.productID}`);
                }} className='flex-row' style={{ padding: '20px', cursor: 'pointer' }}>
                  <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                  <p style={{ width: '320px', marginRight: '5px', color: 'black' }}>{product.productName} <br />
                    Adet : {product.count}</p>
                  <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price}TL</p>
                  <button onClick={() => dispatch(removeProduct({ productID: product.productID }))} style={{ padding: '5px', borderRadius: '5px', backgroundColor: 'rgb(185, 76, 76)', border: 'none', color: '#fff', width: '50px' }}>sil</button>
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
            }}> toplam tutar : {totalAmount} ₺</p>
          )}
        </div>
        <div>


          {totalAmount > 0 && (
            <button style={{
              textAlign: 'center', marginLeft: '180px',
              marginBottom: '50px', backgroundColor: '#7e82b5', color: 'white', cursor: 'pointer'
              , padding: '10px', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold'
            }}> Ödeme Ekranına Git</button>)}

          {totalAmount == 0 && (
            <p style={{ margin: '50px' }}>Sepetiniz boş</p>
          )}
        </div>

      </Drawer>
      <Footer />
      {/* </PageContainer> */}
    </div>

  )
}

export default App
