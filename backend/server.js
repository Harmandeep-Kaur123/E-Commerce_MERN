const express = require("express");
//const products = require("./data/products");
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const productRoutes = require('./routes/productsRoute')
const usersRoutes = require('./routes/UsersRoute')
const orderRoutes = require('./routes/orderRoute')
const {errorHandler} =require('./middlewares/errorMiddleware')

//config dotenv
dotenv.config();
connectDb();
const app = express();

//middleware bodyparser
app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Node Server</h1>");
  });
app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("server started");
});