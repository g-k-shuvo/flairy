import React from "react";
import ProductListContainer from "../components/ProductList/ProductListContainer";

const ProductList = ({ history, match }) => {
  return <ProductListContainer history={history} match={match} />;
};

export default ProductList;
