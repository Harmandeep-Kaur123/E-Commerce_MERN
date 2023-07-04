import React, {useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import CheckOutStep from "../components/shared/CheckoutStep";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const [updatedCart, setUpdatedCart] = useState(null);

    // Function for decimal
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
    
      const placeOrderHandler = () => {
        dispatch(
          createOrder({
            orderItems: updatedCart.cartItems,
            shippingAddress: updatedCart.shippingAddress,
            paymentMethod: updatedCart.paymentMethod,
            itemsPrice: updatedCart.itemsPrice,
            shippingPrice: updatedCart.shippingPrice,
            taxPrice: updatedCart.taxPrice,
            totalPrice: updatedCart.totalPrice,
          })
        );
      };
    
      useEffect(() => {
        // Calculate updated cart
        const calculateCart = () => {
          const itemsPrice = addDecimal(
            cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
          );
          const shippingPrice = addDecimal(cart.cartItems.length > 500 ? 0 : 50);
          const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));
          const totalPrice = (
            Number(itemsPrice) +
            Number(shippingPrice) +
            Number(taxPrice)
          ).toFixed(2);
    
          setUpdatedCart({
            ...cart,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          });
        };
    
        calculateCart();
      }, [cart]);
    
    
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [navigate,success]);

  if (!updatedCart) {
    return <div>Loading cart...</div>; // Render a loading state
  }

  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address}&nbsp;
                {cart.shippingAddress.city}&nbsp;
                {cart.shippingAddress.postalcode}&nbsp;
                {cart.shippingAddress.country}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${updatedCart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${updatedCart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${updatedCart.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${updatedCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={updatedCart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;