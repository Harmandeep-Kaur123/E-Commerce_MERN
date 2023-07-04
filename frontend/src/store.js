import { configureStore } from "@reduxjs/toolkit";
import { productListReducer,productDetailsReducer} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer, userRegisterReducer,userDetailsReducer, userUpdateProfileReducer} from "./reducers/userReducer"
import {orderCreateReducer, orderDetailsReducer, orderPayReducer,orderListMyReducer} from "./reducers/orderReducer" 
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")? JSON.parse(localStorage.getItem("shippingAddress")): {};

const userInfoFromStorage = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null;

const cartItemsFromStorage = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [];

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
   },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer
  },
  preloadedState,
});

export default store;
