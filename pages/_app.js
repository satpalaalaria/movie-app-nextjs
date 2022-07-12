import '../styles/globals.css'
import '../styles/styles-header.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import { ThemeProvider } from 'next-themes'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp;
