import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Reusables/Loader";
import { listTopProducts } from "../../actions/productActions";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../Reusables/Product";
import Message from "../Reusables/Message";

const TopProducts = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <section className="top-products">
      <Container>
        <div className="top-products-heading">
          <h1>Top Products</h1>
        </div>

        <div className="top-products-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row className="gy-4">
              {products.map((product) => (
                <Col key={product._id} lg={3} md={4} sm={12} xs={12}>
                  <Product product={product} />
                </Col>
              ))}
              <Col lg={12}>
                <div className="see-all-products">
                  <Link to="/shop" className="main-btn">
                    All Products
                  </Link>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </section>
  );
};

export default TopProducts;
