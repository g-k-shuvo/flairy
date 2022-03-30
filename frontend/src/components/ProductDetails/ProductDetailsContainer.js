import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import Rating from "../Reusables/Rating";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import { FaRegSadTear, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { addToCart } from "../../actions/cartActions";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetailsContainer = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      toast.success("Review Added!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    if (selectedColor === null || selectedSize === null) {
      toast.warn("Please select color and size!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(
        addToCart(product._id, selectedQuantity, selectedColor, selectedSize)
      );
      toast.success("Added to cart!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(product._id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div id="product-details-container" className="section-padding">
      <Container>
        <div className="back-btn-container">
          <Link to="/shop" className="main-btn">
            Go Back
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          product.name && (
            <Row>
              <Col lg={5} md={6} sm={12} xs={12}>
                <div className="product-slider-container">
                  <div className="big-slider">
                    <Slider
                      asNavFor={nav2}
                      ref={(slider1) => setNav1(slider1)}
                      arrows={false}
                    >
                      {product.images.map((image, index) => (
                        <div className="slider-big-img" key={index}>
                          <img src={image} alt="" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="small-slider">
                    <Slider
                      asNavFor={nav1}
                      ref={(slider2) => setNav2(slider2)}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      arrows={false}
                    >
                      {product.images.map((image, index) => (
                        <div className="slider-small-img" key={index}>
                          <img src={image} alt="" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={6} sm={12} xs={12}>
                <div className="product-info-container">
                  <h4 className="product-title">{product.name}</h4>
                  <div className="product-rating">
                    <Rating value={product.rating} />
                    <span className="product-rating-count">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="review-text">{product.numReviews} Reviews</p>
                  <div className="product-description">
                    <p>{product.description}</p>
                  </div>
                  <div className="product-price">
                    <h3>${product.price}</h3>
                  </div>
                  <div className="product-color-selector">
                    <h4 className="color-select-heading">Color</h4>
                    <Form>
                      {product.colors.map((color, index) => (
                        <Form.Check
                          key={index}
                          inline
                          name="selectedColor"
                          className={color}
                          type="radio"
                          value={color}
                          label={color}
                          onChange={(e) => setSelectedColor(e.target.value)}
                        />
                      ))}
                    </Form>
                  </div>
                  <div className="product-size-selector">
                    <h4 className="size-select-heading">Size</h4>
                    <Form>
                      {product.sizes.map((size, index) => (
                        <Form.Check
                          key={index}
                          inline
                          name="selectedColor"
                          type="radio"
                          value={size}
                          label={size}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        />
                      ))}
                    </Form>
                  </div>
                  <h6 className="inStockCount">
                    In Stock- {product.countInStock}
                  </h6>
                  <div className="product-count-add-wish-container">
                    <div className="product-qty-form">
                      <select
                        value={selectedQuantity}
                        className="qtyInput"
                        onChange={(e) =>
                          setselectedQuantity(Number(e.target.value))
                        }
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="addToCart"
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </button>
                    <button className="addToWishlist">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
                <div className="product-review-container">
                  <div className="review-title">
                    <h4>Reviews</h4>
                  </div>
                  <div className="reviews">
                    {product.reviews.length === 0 ? (
                      <div className="notFound">
                        <h5>
                          No Reviews <FaRegSadTear />
                        </h5>
                      </div>
                    ) : (
                      <ul className="review-list">
                        {product.reviews.map((review) => (
                          <li className="single-review" key={review._id}>
                            <div className="review-author">
                              <FaRegUserCircle
                                fontSize="48px"
                                color="#555555"
                              />
                            </div>
                            <div className="review-content">
                              <h6>{review.name}</h6>
                              <Rating value={review.rating} />
                              <p className="review-comment">
                                "{review.comment}"
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="review-form">
                    <div className="review-heading">
                      <h3>Write a review</h3>
                    </div>
                    {errorProductReview && (
                      <Message variant="warning">{errorProductReview}</Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="review-select"
                            required
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="review-textarea"
                            required
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          className="review-submit"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">Sign in</Link> to write a
                        review!
                      </Message>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          )
        )}
      </Container>
    </div>
  );
};

export default ProductDetailsContainer;
