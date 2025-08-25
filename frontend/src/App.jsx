import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import { AuthProvider } from '../context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import MyOrder from './pages/MyOrder'
// import AdminOrders from './pages/AdminOrders'
 import Checkout from './pages/Checkout'
import TermsAndConditions from './pages/TermsAndConditions'
import RefundPolicy from './pages/RefundPolicy'
import CancellationPolicy from './pages/CancelationPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
// import VerifyMobile from './pages/VerifyMobile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subscribe from './pages/Subscribe'
// import CartPage from './pages/CartPage'
// import { CartProvider } from '../context/CartContext'
// import Checkout from './components/CheckOut'



const App = () => {
  return (
    <>
      <AuthProvider>
        {/* <CartProvider> */}
      <BrowserRouter>
      <Navbar/>
      <div className="pt-16">
        {/* Add a margin-top to avoid overlap with the navbar */}
        <div className="container mx-auto">
          {/* Your main content goes here */}
        </div>
      </div>
      {/* Define your routes here */}
      {/* This is where the main content of your app will be rendered */}
      {/* You can add a footer here if needed */}
      {/* Example of a footer */}
     
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute> } /> */}
        {/* <Route path="/about" element={<ProtectedRoute> <About/> </ProtectedRoute>} /> */}
        {/* <Route path="/products" element={<ProtectedRoute> <Product/> </ProtectedRoute>} /> */}
        {/* <Route path="/products/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} /> */}
        {/* <Route path="/cart" element={<ProtectedRoute> <CartPage/> </ProtectedRoute>} /> */}
           {/* <Route path="/my-orders" element={<ProtectedRoute> <MyOrder /> </ProtectedRoute>} />  */}
           {/* <Route  path="/profile"  element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/> */}
        <Route path="/" element={ <Home/>  } />
        <Route path="/about" element={ <About/> } />
        <Route path="/products" element={ <Product/> } />
        {/* <Route path="/verifymobile" element={<VerifyMobile />} /> */}
        {/* <Route path="/products/:productId" element={<ProductDetails />} /> */}
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
           {/* Protected Routes */}
           <Route  path="/profile"  element={ <ProfilePage />  }/>
           <Route path="/my-orders" element={ <MyOrder /> } /> 
           {/* <Route path='/admin' element={<AdminOrders/>}/> */}
            <Route path='/checkout' element={<Checkout/>}/> 
             <Route path="*" element={<h1>Page Not Found</h1>} />
            <Route path='/subscribe' element={<Subscribe/>}/> 
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           {/* checkout */}
           {/* <Route path="/checkout" element={<Checkout/>} />
           <Route path="/payment-success" element={<h2>Payment Success!</h2>} /> */}
      </Routes>
      <Footer/>
       <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
      {/* </CartProvider> */}
      </AuthProvider>
    </>
  )
}

export default App
