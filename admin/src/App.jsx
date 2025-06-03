import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import AdminOrders from "./pages/AdminOrders";
import AdminNavbar from "./components/AdminNavbar";
import AdminOrderUpdate from "./pages/AdminOrderUpdate";
// import Users from "./pages/Users";
// import Orders from "./pages/Orders";
// import EditOrder from "./pages/EditOrder";

const App = () => {
  return (
    <Router>
     <AdminNavbar />
     
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<AdminOrders/>} />
              <Route path="/admin/order/update" element={<AdminOrderUpdate/>} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/edit/:id" element={<ProductForm />} />

          

          {/* Add more routes as needed */}
        </Routes>
    </Router>
  );
};

export default App;



