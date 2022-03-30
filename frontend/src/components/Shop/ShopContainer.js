import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";
import Product from "../Reusables/Product";
import Loader from "../Reusables/Loader";
import Paginate from "../Reusables/Paginate";
import { listProducts } from "../../actions/productActions";
import { FaRegSadTear } from "react-icons/fa";
import Message from "../Reusables/Message";

const ShopContainer = ({ match }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Newest");

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    setFilteredProducts(
      products &&
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "Price Low To High") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value === "All Categories") {
      const { category, ...allCategoryProducts } = filters;
      setFilters(allCategoryProducts);
    } else if (value === "All Colors") {
      const { colors, ...allColorProducts } = filters;
      setFilters(allColorProducts);
    } else if (value === "All Sizes") {
      const { sizes, ...allSizeProducts } = filters;
      setFilters(allSizeProducts);
    } else {
      setFilters({ ...filters, [e.target.name]: value });
    }
  };

  return (
    <section id="shop-container" className="section-padding">
      <Container>
        <div className="back-btn-container">
          <Link to="/" className="main-btn">
            Go Back
          </Link>
        </div>
        <Row className="gy-4">
          <Col lg={3} md={4} sm={12} xs={12}>
            <div className="filter-container">
              <div className="container-heading">
                <h1>Filter Products</h1>
              </div>

              <div className="filters">
                <div className="sort">
                  <h3 className="filter-heading">Sort</h3>
                  <Form.Control
                    as="select"
                    className="filter-select"
                    aria-label="Default select example"
                    onChange={handleSort}
                  >
                    <option value="Newest">Newest</option>
                    <option value="Price Low To High">
                      Price (Lowest to Highest)
                    </option>
                    <option value="price High To Low">
                      Price (Highest to Lowest)
                    </option>
                  </Form.Control>
                </div>
                <div className="category">
                  <h3 className="filter-heading">Category</h3>
                  <Form.Control
                    as="select"
                    className="filter-select"
                    aria-label="Default select example"
                    name="category"
                    onChange={handleFilters}
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Woman Wear">Woman Wear</option>
                    <option value="Man Wear">Man Wear</option>
                    <option value="Children Wear">Children Wear</option>
                    <option value="Accessories">Accessories</option>
                  </Form.Control>
                </div>

                <div className="color">
                  <h3 className="filter-heading">Color</h3>
                  <Form.Control
                    as="select"
                    className="filter-select"
                    aria-label="Default select example"
                    name="colors"
                    onChange={handleFilters}
                  >
                    <option value="All Colors">All Colors</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Brown">Brown</option>
                    <option value="Orange">Orange</option>
                    <option value="Pink">Pink</option>
                    <option value="Purple">Purple</option>
                    <option value="Grey">Grey</option>
                  </Form.Control>
                </div>

                <div className="size">
                  <h3 className="filter-heading">Size</h3>
                  <Form.Control
                    as="select"
                    className="filter-select"
                    aria-label="Default select example"
                    name="sizes"
                    onChange={handleFilters}
                  >
                    <option value="All Sizes">All Sizes</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </Form.Control>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={9} md={8} sm={12} xs={12}>
            <div className="product-container">
              <div className="container-heading">
                <h1>All Products</h1>
              </div>
              <div className="products">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : products.length !== 0 && filteredProducts.length !== 0 ? (
                  <div className="products-pagintaion-wrapper">
                    <Row className="gy-4">
                      {filters
                        ? filteredProducts.map((product) => (
                            <Col lg={4} md={4} sm={6} xs={12} key={product._id}>
                              <Product product={product} />
                            </Col>
                          ))
                        : products.map((product) => (
                            <Col lg={4} md={4} sm={6} xs={12} key={product._id}>
                              <Product product={product} />
                            </Col>
                          ))}
                    </Row>
                    <Paginate
                      pages={pages}
                      page={page}
                      keyword={keyword ? keyword : ""}
                    />
                  </div>
                ) : (
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div className="notFound">
                        <h5>
                          Products Not Found! <FaRegSadTear />
                        </h5>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopContainer;
