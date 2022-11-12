import { Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './scss/style.scss';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllColors, getFavoriten, getAllCategories } from './redux/slices/appSlice';

function App() {
  const dispatch = useDispatch()
  const { loading, favorite, userId} = useSelector(state => state.app)

  useEffect(() => {
    dispatch(getAllColors())
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (userId !== null){
      dispatch(getFavoriten(userId))
    }
    
  }, [userId])

  return (
    <>
      <Header favorite={favorite[0]} userId={userId}/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<ShopPage />} />
        <Route path="/favoriten" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Backdrop
        sx={{ color: '#34c3ff', zIndex: 1400 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Footer userId={userId}/>
    </>
  );
}

export default App;
