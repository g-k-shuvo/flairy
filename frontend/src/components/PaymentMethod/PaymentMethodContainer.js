import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Reusables/CheckoutSteps";
import { savePaymentMethod } from "../../actions/cartActions";

const PaymentMethodContainer = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div id="payment-method-container" className="section-padding">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7} md={12} sm={12} xs={12}>
            <CheckoutSteps step1 step2 step3 />
            <div className="payment-method-form-container">
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label as="legend">Select Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    id="Stripe"
                    name="paymentMethod"
                    value="Stripe"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Cash On Delivery"
                    id="Cash On Delivery"
                    name="paymentMethod"
                    value="CashOnDelivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Continue
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentMethodContainer;
