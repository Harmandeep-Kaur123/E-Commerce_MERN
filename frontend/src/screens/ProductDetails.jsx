import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
//import Product from '../products'
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import {Row, Col, ListGroup,ListGroupItem, Button, Image, Form } from 'react-bootstrap'
import { useParams,useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

const ProductDetails = ({  }) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);
 
     // Use the useParams hook to get the id parameter
     //const product = Product.find((p) => p._id === id);
    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
    };  
    
    return (
    <div>
        <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left    "></i>
        &nbsp; GO BACK
        </Link>
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
                {product.countInStock > 0 ? "In Stock " : "out of stock"}
              </Col>
            </Row>
          </ListGroupItem>
          {product.countInStock > 0 && (
            <ListGroupItem>
              <Row>
                <Col
                style={{ marginTop: '10px', marginBottom: '10px' }}
                 >
                Qty</Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Row>
            </ListGroupItem>
          )}
          <ListGroupItem>
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </ListGroupItem>
        </Col>
        </Row> 
    </div>
  )
}

export default ProductDetails
