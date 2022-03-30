import React from "react";
import ProductDetailsContainer from "../components/ProductDetails/ProductDetailsContainer";

const ProductDetails = ({ history, match }) => {
  return <ProductDetailsContainer history={history} match={match} />;
};

export default ProductDetails;
