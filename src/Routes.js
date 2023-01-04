import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Cart from './core/Cart';
import Home from './core/Home';
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/user/dashboard" exact element={<UserDashBoard />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" exact element={<AdminDashBoard />} />
            <Route
              path="/admin/create/category"
              exact
              element={<AddCategory />}
            />
            <Route
              path="/admin/create/product"
              exact
              element={<AddProduct />}
            />
            <Route
              path="/admin/categories"
              exact
              element={<ManageCategories />}
            />
            <Route path="/admin/products" exact element={<ManageProducts />} />
            <Route
              path="/admin/product/update/:productId"
              exact
              element={<UpdateProduct />}
            />
          </Route>
          {/* <PrivateRoute path="/user/dashboard" exact element={<UserDashBoard />} />
          <AdminRoute path="/admin/dashboard" exact element={<AdminDashBoard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routers;
