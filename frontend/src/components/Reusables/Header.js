import React from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Dropdown, Navbar, Nav } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiUser, BiShoppingBag, BiHeart } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const cartInfo = useSelector((state) => state.cart);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("You are now logged out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <header>
      <div className='header-top'>
        <Container>
          <Row className='gy-3 align-items-center'>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='header-socials'>
                <ul className='header-social-list'>
                  <li className='header-social-list-item'>
                    <a
                      target='_blank'
                      href='https://www.facebook.com/shuvo.2k16'
                      className='header-social-link'
                      rel='noreferrer'
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li className='header-social-list-item'>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href='https://www.youtube.com/g_k_shuvo'
                      className='header-social-link'
                    >
                      <FaYoutube />
                    </a>
                  </li>
                  <li className='header-social-list-item'>
                    <a
                      href='https://www.instagram.com/g_k_shuvo'
                      className='header-social-link'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li className='header-social-list-item'>
                    <a
                      href='https://www.facebook.com/shuvo.2k16'
                      className='header-social-link'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='header-discount'>
                <p className='header-discount-text'>
                  Free Shipping This Week Order Over - $75
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='header-currency-and-language'>
                <div className='currency-dropdown'>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='ht-dropdown'
                    >
                      Currency
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='ht-dropdown-menu'>
                      <Dropdown.Item href='/'>USD</Dropdown.Item>
                      <Dropdown.Item href='/'>CAD</Dropdown.Item>
                      <Dropdown.Item href='/'>BDT</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className='language-dropdown'>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='ht-dropdown'
                    >
                      Language
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='ht-dropdown-menu'>
                      <Dropdown.Item href='/'>English</Dropdown.Item>
                      <Dropdown.Item href='/'>Spanish</Dropdown.Item>
                      <Dropdown.Item href='/'>Bangla</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='header-info'>
        <Container>
          <Row className='gy-3 align-items-center'>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='brand'>
                <Link to='/' className='logo'>
                  Flairy
                </Link>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='header-search-form'>
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className='account-wish-cart'>
                <Dropdown>
                  <Dropdown.Toggle
                    id='dropdown-basic'
                    as={"span"}
                    className='hi-ac-dropdown'
                  >
                    <BiUser />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='hi-ac-dropdown-menu'>
                    {userInfo ? (
                      <>
                        <LinkContainer to='/profile'>
                          <Dropdown.Item>Profile</Dropdown.Item>
                        </LinkContainer>
                        {userInfo.isAdmin && (
                          <>
                            <LinkContainer to='/admin/userlist'>
                              <Dropdown.Item>Users</Dropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                              <Dropdown.Item>Products</Dropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                              <Dropdown.Item>Orders</Dropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        <Dropdown.Item as='button' onClick={logoutHandler}>
                          Logout
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <LinkContainer to='/login'>
                          <Dropdown.Item>Sign In</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                          <Dropdown.Item>Sign Up</Dropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                <div className='hi-wish'>
                  <Link to='/wishlist'>
                    <BiHeart />
                    <span className='hi-wish-count'>4</span>
                  </Link>
                </div>
                <div className='hi-cart'>
                  <Link to='/cart'>
                    <BiShoppingBag />
                    <div className='hi-cart-count'>
                      {cartInfo.cartItems.length}
                    </div>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='header-navbar'>
        <Navbar bg='transparent' expand='md'>
          <Container className='justify-content-center'>
            <Navbar.Toggle
              aria-controls='navbarScroll'
              className='nav-toggler-btn'
            />
            <Navbar.Collapse
              id='navbarScroll'
              className='navbar-collapse-container'
            >
              <Nav className='m-auto my-2 my-lg-0'>
                <LinkContainer to='/'>
                  <Nav.Link className='header-nav-link'>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/shop'>
                  <Nav.Link className='header-nav-link'>Shop</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/about-us'>
                  <Nav.Link className='header-nav-link'>About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/contact-us'>
                  <Nav.Link className='header-nav-link'>Contact Us</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
