import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="md-stepper-horizontal">
      {step1 ? (
        <LinkContainer to="/login">
          <div className="md-step active">
            <div className="md-step-circle">
              <span>1</span>
            </div>
            <div className="md-step-title">Sign In</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
        </LinkContainer>
      ) : (
        <div className="md-step">
          <div className="md-step-circle">
            <span>1</span>
          </div>
          <div className="md-step-title">Sign In</div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>
      )}

      {step2 ? (
        <LinkContainer to="/shipping">
          <div className="md-step active">
            <div className="md-step-circle">
              <span>2</span>
            </div>
            <div className="md-step-title">Shipping</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
        </LinkContainer>
      ) : (
        <div className="md-step">
          <div className="md-step-circle">
            <span>2</span>
          </div>
          <div className="md-step-title">Shipping</div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>
      )}

      {step3 ? (
        <LinkContainer to="/payment">
          <div className="md-step active">
            <div className="md-step-circle">
              <span>3</span>
            </div>
            <div className="md-step-title">Payment</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
        </LinkContainer>
      ) : (
        <div className="md-step">
          <div className="md-step-circle">
            <span>3</span>
          </div>
          <div className="md-step-title">Payment</div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>
      )}

      {step4 ? (
        <LinkContainer to="/placeorder">
          <div className="md-step active">
            <div className="md-step-circle">
              <span>4</span>
            </div>
            <div className="md-step-title">Place Order</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
        </LinkContainer>
      ) : (
        <div className="md-step">
          <div className="md-step-circle">
            <span>4</span>
          </div>
          <div className="md-step-title">Place Order</div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>
      )}
    </div>

    // <Nav classNameName='justify-content-center mb-4'>
    //   <Nav.Item>
    //     {step1 ? (
    //       <LinkContainer to='/login'>
    //         <Nav.Link>Sign In</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Sign In</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step2 ? (
    //       <LinkContainer to='/shipping'>
    //         <Nav.Link>Shipping</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Shipping</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step3 ? (
    //       <LinkContainer to='/payment'>
    //         <Nav.Link>Payment</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Payment</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step4 ? (
    //       <LinkContainer to='/placeorder'>
    //         <Nav.Link>Place Order</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Place Order</Nav.Link>
    //     )}
    //   </Nav.Item>
    // </Nav>
  );
};

export default CheckoutSteps;
