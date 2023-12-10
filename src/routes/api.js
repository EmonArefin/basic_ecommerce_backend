const express = require("express")
const router = express.Router();

const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

//user
const UserController = require("../controllers/UserController");
router.post("/create-user", UserController.CreateUserProfile);
router.post("/user-login", UserController.UserLogin);
router.get("/user-profile", AuthVerifyMiddleware, UserController.ReadUserProfile);
router.post("/update-profile", AuthVerifyMiddleware, UserController.UpdateUserProfile);

router.get("/recover-verify-email/:email", UserController.RecoverVerifyEmail);
router.get("/recover-verify-otp/:email/:otp", UserController.RecoverVerifyOTP);
router.post("/recover-reset-pass", UserController.RecoverResetPass);

router.post("/delete-student-profile", AuthVerifyMiddleware, UserController.DeleteUserProfile);

//product
const ProductController = require("../controllers/ProductController");
router.post("/create-product", ProductController.CreateProduct);
router.get("/read-all-product", ProductController.ReadAllProduct);
router.get("/read-product-by-id/:id", ProductController.ReadProductById);
router.get("/read-product-by-category/:category", ProductController.ReadProductByCategory);
router.post("/update-product/:id", ProductController.UpdateProduct);
router.post("/delete-product/:id", ProductController.DeleteProduct);

//cart
const CartItemController = require("../controllers/CartItemController");
router.post("/add-to-cart", CartItemController.AddToCartProduct);
router.get("/cart-product", CartItemController.ReadCartProduct);
router.post("/update-cart/:id", CartItemController.UpdateCartProduct);
router.post("/remove-cart-item/:id", CartItemController.RemoveCartProduct);

//order
const OrderController = require("../controllers/OrderController");
router.post("/create-order", OrderController.CreateOrder);
router.post("/update-order/:userID", OrderController.UpdateOrder);
router.get("/cancel-order/:orderID", OrderController.CancelOrder);

module.exports=router;