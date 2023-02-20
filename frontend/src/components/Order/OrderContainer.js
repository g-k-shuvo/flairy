import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import { toast } from "react-toastify";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import StripeCheckout from "./StripeContainer";

const OrderContainer = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.selectedQuantity,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // if (!window.paypal) {
      //   addPayPalScript();
      // } else {
      //   setSdkReady(true);
      // }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    toast.success("Marked as Delivered!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div id='order-container' className='section-padding'>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            <Col md={8}>
              <div className='order-details'>
                <div className='order-heading'>
                  <h3>Order: #{order._id}</h3>
                </div>
                <div className='shipping-info'>
                  <h3 className='heading'>Shipping</h3>
                  <p className='user-name'>Name: {order.user.name}</p>
                  <p className='user-email'>
                    Email:{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p className='shipping-address'>
                    Address:
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div className='delivery-info'>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </div>
                <hr />

                <div className='payment-info'>
                  <h3 className='heading'>Payment Method</h3>
                  <p className='payment-method'>{order.paymentMethod}</p>
                </div>
                <div className='isPaid-info'>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </div>
                <hr />
                <div className='order-items-info'>
                  <h3 className='heading'>Order Items</h3>
                  <div className='order-items-list'>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ul>
                        {order.orderItems.map((item, index) => (
                          <li key={index}>
                            <div className='order-item'>
                              <div className='product-details'>
                                <div className='product-image'>
                                  <img src={item.image} alt={item.name} />
                                </div>
                                <div className='product-link'>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </div>
                              </div>
                              <div className='qty-and-total'>
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
              <div className='order-summary-container'>
                <div className='order-summary-heading'>
                  <h4>Order Summary</h4>
                </div>
                <div className='order-summary-list'>
                  <ul>
                    <li className='order-summary-item'>
                      <div className='info'>
                        <p>Items</p>
                      </div>
                      <div className='amount'>${order.itemsPrice}</div>
                    </li>
                    <li className='order-summary-item'>
                      <div className='info'>
                        <p>Shipping</p>
                      </div>
                      <div className='amount'>${order.shippingPrice}</div>
                    </li>
                    <li className='order-summary-item'>
                      <div className='info'>
                        <p>Tax</p>
                      </div>
                      <div className='amount'>${order.taxPrice}</div>
                    </li>
                    <li className='order-summary-item'>
                      <div className='info'>
                        <p>Total</p>
                      </div>
                      <div className='amount'>${order.totalPrice}</div>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className='order-payment-form'>
                  {!order.isPaid && (
                    <StripeCheckout order={order} successPay={successPay} />
                  )}
                </div>
                <div className='order-deliver-info'>
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div className='order-deliver-btn-container'>
                        <button onClick={deliverHandler}>
                          Mark As Delivered
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default OrderContainer;
