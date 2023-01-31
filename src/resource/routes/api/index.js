const express = require("express");

const accountRoutes = require("../account");
const categoryRoutes = require("../category");
const productRoutes = require("../products")
const cartRoutes = require("../cart");
const orderRoutes = require("../order");
const commentRoutes = require("../comment");
const statisticRoutes = require("../statistic");

const apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
apiRoutes.use("/accounts", accountRoutes)
apiRoutes.use("/products", productRoutes)
apiRoutes.use("/cart", cartRoutes)
apiRoutes.use("/order", orderRoutes)
apiRoutes.use("/comment", commentRoutes)
apiRoutes.use("/category", categoryRoutes);
apiRoutes.use("/statistic", statisticRoutes);

module.exports = apiRoutes;