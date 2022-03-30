import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import CheckoutSteps from "../Reusables/CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import { USER_DETAILS_RESET } from "../../constants/userConstants";

const PlaceOrderContainer = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.selectedQuantity,
      0
    )
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div id="place-order-container" className="section-padding">
      <Container>
        <Row>
          <Col md={8}>
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="order-details">
              <div className="shipping-info">
                <h3 className="heading">Shipping Address</h3>
                <p className="shipping-address">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>
              <div className="payment-info">
                <h3 className="heading">Payment Method</h3>
                <p className="payment-method">{cart.paymentMethod}</p>
              </div>
              <div className="order-items-info">
                <h3 className="heading">Order Items</h3>
                <div className="order-items-list">
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ul>
                      {cart.cartItems.map((item, index) => (
                        <li key={index}>
                          <div className="order-item">
                            <div className="product-details">
                              <div className="product-image">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div className="product-link">
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                            <div className="qty-and-total">
                              <p>
                                {item.selectedQuantity} x ${item.price} = $
                                {Number(
                                  item.selectedQuantity * item.price
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="order-summary-container">
              <div className="order-summary-heading">
                <h4>Order Summary</h4>
              </div>
              <div className="order-summary-list">
                <ul>
                  <li className="order-summary-item">
                    <div className="info">
                      <p>Items</p>
                    </div>
                    <div className="amount">${cart.itemsPrice}</div>
                  </li>
                  <li className="order-summary-item">
                    <div className="info">
                      <p>Shipping</p>
                    </div>
                    <div className="amount">${cart.shippingPrice}</div>
                  </li>
                  <li className="order-summary-item">
                    <div className="info">
                      <p>Tax</p>
                    </div>
                    <div className="amount">${cart.taxPrice}</div>
                  </li>
                  <li className="order-summary-item">
                    <div className="info">
                      <p>Total</p>
                    </div>
                    <div className="amount">${cart.totalPrice}</div>
                  </li>
                  <li className="place-order-btn-container">
                    <button
                      className="place-order-btn"
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </button>
                    {error && <Message variant={error} children={error} />}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrderContainer;
