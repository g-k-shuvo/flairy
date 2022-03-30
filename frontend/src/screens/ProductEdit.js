import React from "react";
import ProductEditContainer from "../components/ProductEdit/ProductEditContainer";

const ProductEdit = ({ match, history }) => {
  return <ProductEditContainer match={match} history={history} />;
};

export default ProductEdit;
