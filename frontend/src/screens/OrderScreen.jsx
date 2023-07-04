import React, { useState, useEffect } from "react";
//import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
//import { ORDER_PAY_RESET } from "../constants/orderConstant";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
//import { use } from "../../../backend/routes/orderRoute";

const OrderScreen = () => {
    const { id } = useParams();
    //const orderId= id;
    const dispatch = useDispatch();
  
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
     
    useEffect(() => {
      dispatch(getOrderDetails(id));
    }, [dispatch, id]);
  
    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
  
    // Check if order and order.orderItems are defined
    if (!order || !order.orderItems) {
      return null; // Return an appropriate component or message if order is not available
    }
  
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
  
    const updatedOrder = {
      ...order,
      itemsPrice: addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      ),
    };

    return(
    <>
        <h2>Order {order._id}</h2>
        <Row>
            <Col md={8}>
            <ListGroup.Item variant="flush" className="border-bottom border-dark-gray mb-3">
            <h2>Shipping</h2>
            <p>
              <strong>Name : </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email : </strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address :</strong>
              {order.shippingAddress.address}&nbsp;
              {order.shippingAddress.city}&nbsp;
              {order.shippingAddress.postalcode}&nbsp;
              {order.shippingAddress.country}&nbsp;
            </p>
            {order.isDeliverd ? (
              <Message variant="success">Paid On {order.isDeliverd}</Message>
            ) : (
              <Message variant="danger">Not Deliverd</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item className="border-bottom border-dark-gray mb-3">
            <h2>Payment Method</h2>
            <p>
              <strong>Method :</strong>
              <strong>{order.paymentMethod}</strong>
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid On {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item className="border-bottom border-dark-gray mb-3">
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your Cart is Empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
            </Col>
        </Row>
    </>
     )

}

export default OrderScreen