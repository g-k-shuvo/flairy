import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseInit";

const ProductEditContainer = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
      toast.success("Product Updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImages(product.images);
        setDescription(product.description);
        setCategory(product.category);
        setColors(product.colors);
        setSizes(product.sizes);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const handleImageSubmit = () => {
    setImageUploading(true);
    const promises = [];
    selectedImages.forEach((file) => {
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages((prevState) => [...prevState, downloadURL]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => setImageUploading(false))
      .catch((err) =>
        toast.error(err, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  const handleImageChange = (e) => {
    if (e.target.files.length < 3) {
      e.target.value = [];
      toast.error("Please select 3 image at least!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setImages([]);
      for (let i = 0; i < e.target.files.length; i++) {
        const newImage = e.target.files[i];
        newImage["id"] = Math.random();
        setSelectedImages((prevState) => [...prevState, newImage]);
      }
    }
  };

  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setColors([...colors, value]);
    } else {
      setColors(colors.filter((e) => e !== value));
    }
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      setSizes(sizes.filter((e) => e !== value));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        images,
        category,
        sizes,
        colors,
        countInStock,
      })
    );
  };

  const colorArray = [
    "Black",
    "White",
    "Red",
    "Green",
    "Yellow",
    "Blue",
    "Brown",
    "Orange",
    "Pink",
    "Purple",
    "Grey",
  ];

  const sizeArray = ["S", "M", "L", "XL", "XXL"];

  return (
    <section id='product-edit-container' className='section-padding'>
      <Container>
        <div className='back-btn-container'>
          <Link to='/admin/productlist' className='main-btn'>
            Go Back
          </Link>
        </div>
        <Row className='justify-content-center'>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className='heading'>
              <h3>Edit Product</h3>
            </div>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <div className='product-edit-form'>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='Enter description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>Images</Form.Label>
                    {imageUploading ? (
                      <Loader />
                    ) : (
                      <div className='image-input-container'>
                        <Form.File
                          id='image-file'
                          multiple
                          onChange={handleImageChange}
                        ></Form.File>

                        <button
                          disabled={imageUploading}
                          onClick={handleImageSubmit}
                        >
                          Upload
                        </button>
                      </div>
                    )}

                    {images.length !== 0 && (
                      <>
                        <hr />
                        <div className='image-container'>
                          {images.map((image, index) => (
                            <img
                              key={index}
                              className='uploaded-image'
                              src={image}
                              alt=''
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='select'
                      placeholder='Select Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value='All Categories'>All Categories</option>
                      <option value='Woman Wear'>Woman Wear</option>
                      <option value='Man Wear'>Man Wear</option>
                      <option value='Children Wear'>Children Wear</option>
                      <option value='Accessories'>Accessories</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='colors'>
                    <Form.Label>Select Colors</Form.Label>
                    {colorArray.map((color, index) => (
                      <Form.Check
                        key={index}
                        type='checkbox'
                        value={color}
                        label={color}
                        checked={colors.includes(color)}
                        onChange={handleColorChange}
                      />
                    ))}
                  </Form.Group>

                  <Form.Group controlId='sizes'>
                    <Form.Label>Select Sizes</Form.Label>
                    {sizeArray.map((size, index) => (
                      <Form.Check
                        key={index}
                        type='checkbox'
                        value={size}
                        label={size}
                        checked={sizes.includes(size)}
                        onChange={handleSizeChange}
                      />
                    ))}
                  </Form.Group>

                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      min={0}
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <button type='submit' className='product-edit-btn'>
                    Update
                  </button>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductEditContainer;
