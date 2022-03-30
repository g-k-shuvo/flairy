import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Reusables/Header";
import Footer from "./components/Reusables/Footer";
import Home from "./screens/Home";
import Shop from "./screens/Shop";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrder from "./screens/PlaceOrder";
import Order from "./screens/Order";
import UserList from "./screens/UserList";
import UserEdit from "./screens/UserEdit";
import ProductList from "./screens/ProductList";
import ProductEdit from "./screens/ProductEdit";
import OrderList from "./screens/OrderList";
import CheckoutScreen from "./screens/CheckoutScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/order/:id" component={Order} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/payment" component={PaymentMethod} />
      <Route path="/placeorder" component={PlaceOrder} />
      {/* <Route path="/makepayment" component={CheckoutScreen} /> */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/cart/:id?" component={Cart} />
      <Route path="/admin/userlist" component={UserList} />
      <Route path="/admin/user/:id/edit" component={UserEdit} />
      <Route path="/admin/productlist" component={ProductList} exact />
      <Route
        path="/admin/productlist/:pageNumber"
        component={ProductList}
        exact
      />
      <Route path="/admin/product/:id/edit" component={ProductEdit} />
      <Route path="/admin/orderlist" component={OrderList} />
      <Route path="/shop" component={Shop} exact />
      <Route path="/search/:keyword" component={Shop} exact />
      <Route path="/page/:pageNumber" component={Shop} exact />
      <Route path="/search/:keyword/page/:pageNumber" component={Shop} exact />
      <Route path="/" component={Home} exact />

      <Footer />
    </Router>
  );
};

export default App;
