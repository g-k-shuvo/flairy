import React from "react";
import OrderContainer from "../components/Order/OrderContainer";

const Order = ({ match, history }) => {
  return <OrderContainer match={match} history={history} />;
};

export default Order;
