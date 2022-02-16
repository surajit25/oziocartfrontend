import '../styles/globals.css'


import 'react-multi-carousel/lib/styles.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import Head from 'next/head'

import '../styles/home.css'

import '../styles/footer.css'

import '../styles/banner.css'

import '../styles/header.css'
import Header from './header';
import Footer from './footer';
import Subscribe from './subscribe';
import '../styles/product.css'

import '../styles/blog.css'

import '../styles/cart.css'

import '../styles/payment.css'

import '../styles/about.css'

import Store from '../redux';

import {Provider} from 'react-redux'
import MainFooter from './main-footer';

function MyApp({ Component, pageProps }) {
  return (<div>
  
  <Head>

  <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
   />

  </Head>

  <Provider store={Store} >

  <Header />


  
<Component {...pageProps} />




<Subscribe/>

<MainFooter />

<Footer />
    
  </Provider>



  
  </div>
  )
}

export default MyApp
