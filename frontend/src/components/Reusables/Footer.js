import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={4} sm={12} xs={12}>
            <div className="footer-brand">
              <a href="/" className="logo">
                Flairy
              </a>
              <p>
                Developed with 🖤 by
                <a href="http://www.g-k-shuvo.github.io"> Golam Kibria</a>
              </p>
              <p>
                <FaMapMarkerAlt /> - Sreemangal, Sylhet, BD
              </p>
            </div>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <div className="footer-info">
              <h3 className="footer-heading">Information</h3>

              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/">Faq</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <div className="footer-info">
              <h3 className="footer-heading">Pages</h3>

              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/">Shop</Link>
                </li>
                <li>
                  <Link to="/">Cart</Link>
                </li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
