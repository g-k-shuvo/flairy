import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Container } from "react-bootstrap";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const CartContainer = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <section id="cart-container" className="section-padding">
      <Container>
        <Row className="gy-4">
          <Col md={8}>
            <div className="cart-table">
              <table className="f-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        Your cart is empty! Go to <Link to="/shop">Shop</Link>
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr key={item.product}>
                        <td className="product">
                          <div className="product-container">
                            <div className="product-image">
                              <img src={item.image} alt="" />
                            </div>
                            <div className="product-details">
                              <h5>{item.name}</h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="product-price">${item.price}</div>
                        </td>
                        <td>
                          <div className="product-quantity">
                            <Form.Control
                              as="select"
                              className="qty-selector"
                              value={item.selectedQuantity}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </td>
                        <td>
                          <div className="product-remove">
                            <button
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <FaTrash size={"18px"} color="#444444" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="continue-shopping-link">
              <Link to="/shop">Continue Shopping</Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="cart-summary">
              <div className="cart-summary-container">
                <div className="items">
                  <h4>Items</h4>
                  <h4>
                    {cartItems.reduce(
                      (acc, item) => acc + item.selectedQuantity,
                      0
                    )}
                  </h4>
                </div>
                <div className="tax">
                  <h4>Tax</h4>
                  <h4>5%</h4>
                </div>
                <div className="subtotal">
                  <h4>Sub-Total</h4>
                  <h4>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.selectedQuantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </h4>
                </div>
              </div>
              <div className="checkout-btn-container">
                <button
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartContainer;
