import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import Paginate from "../Reusables/Paginate";
import { toast } from "react-toastify";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const ProductListContainer = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
      toast.success("Product Deleted!", {
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

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div id="product-list-container" className="section-padding">
      <Container>
        <Row>
          <div className="heading">
            <div className="heading-text">
              <h3>Products</h3>
            </div>
            <div className="heading-btn">
              <button onClick={createProductHandler}>
                <FaPlus /> Add Product
              </button>
            </div>
          </div>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="product-table">
                <table className="f-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>IN STOCK</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.countInStock}</td>
                        <td>
                          <div className="action-btns">
                            <LinkContainer
                              to={`/admin/product/${product._id}/edit`}
                            >
                              <button className="action-btn edit">
                                <FaEdit size={"16px"} color="#555555" />
                              </button>
                            </LinkContainer>
                            <button
                              className="action-btn delete"
                              onClick={() => deleteHandler(product._id)}
                            >
                              <FaTrash size={"16px"} color="#555555" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="product-table-pagination">
                <Paginate pages={pages} page={page} isAdmin={true} />
              </div>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductListContainer;
