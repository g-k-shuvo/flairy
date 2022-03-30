import React from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Slider from "react-slick";

const BannerSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner-slider">
      <Container className="h-100">
        <Row className="h-100 align-items-center">
          <Slider {...settings}>
            <div>
              <div className="slide">
                <div className="slide-content">
                  <h1 className="slide-heading">Fashion Trends</h1>
                  <p className="slide-sub-heading">
                    * only today we offer free shopping.
                  </p>
                  <div className="slide-link">
                    <Link to="/shop" className="main-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slide">
                <div className="slide-content">
                  <h1 className="slide-heading">Accessories</h1>
                  <p className="slide-sub-heading">
                    * only today we offer free shopping.
                  </p>
                  <div className="slide-link">
                    <Link to="/shop" className="main-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slide">
                <div className="slide-content">
                  <h1 className="slide-heading">Bags & Purses</h1>
                  <p className="slide-sub-heading">
                    * only today we offer free shopping.
                  </p>
                  <div className="slide-link">
                    <Link to="/shop" className="main-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </Row>
      </Container>
    </div>
  );
};

export default BannerSlider;
