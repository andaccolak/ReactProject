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

function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products]);

  return (

    <div>

      <PageContainer>
        <Loading />
        <Header />
        <RouterConfig />
        <ToastContainer autoClose={2500} />
        <Drawer onClose={() => dispatch(setDrawer())} className='drawer' sx={{ padding: '20px' }} anchor='right' open={drawer} >
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: '20px' }}>
                    <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                    <p style={{ width: '320px', marginRight: '5px' }}>{product.title}({product.count})</p>
                    <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price}TL</p>
                    <button onClick={() => dispatch(removeProduct({ id: product.id }))} style={{ padding: '5px', borderRadius: '5px', backgroundColor: 'rgb(185, 76, 76)', border: 'none', color: '#fff', width: '50px' }}>sil</button>
                  </div>


                </div>
              )
            })
          }
          <div>
            <p style={{ textAlign: 'center' }}> toplam tutar : {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>

  )
}

export default App
