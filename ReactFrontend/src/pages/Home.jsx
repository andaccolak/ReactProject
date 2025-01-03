import React from 'react'
import ProductList from '../components/ProductList';
import Productslider from '../components/Productslider';
function Home() {
  return (
    <div>
      <div>
        <div className='home-container'>
          {/* <img className='bg-img' src="./src/images/bg-1.jpg" alt="" /> */}

          <div className='home-info'>

            <h1 className='home-title'>Modanın En Yeni Adresi</h1>
            <p className='home-subtitle'>Hayalinizdeki Stili Gerçekleştirin! En Yeni Moda Trendleri, Kalite ve Şıklığın Buluştuğu Adreste Sizi Bekliyor!</p>
            <button className='home-btn'>HEMEN KEŞFET</button>
          </div>

        </div>
        <div><ProductList /></div>
        <div><Productslider /></div>
      </div>
    </div >
  )
}

export default Home