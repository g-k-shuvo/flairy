import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import { login } from "../../actions/userActions";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section id="login-container" className="section-padding">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="heading">
              <h3>Login</h3>
            </div>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            <div className="login-form">
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <button type="submit" className="login-btn">
                  Sign In
                </button>
              </Form>
            </div>
            <div className="login-footer">
              Don't have an account?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="register-link"
              >
                Register
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
