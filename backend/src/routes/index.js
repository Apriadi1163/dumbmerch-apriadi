const express = require("express");

const router = express.Router();

const { register, login, checkAuth } = require("../controllers/auth");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/product")
const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user")
const { buyProduct, getTransaction, notification } = require("../controllers/transaction")
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { addProfile,getProfile } = require("../controllers/profile")
const { auth } = require("../middlewares/auth")
const { uploadFile } = require("../middlewares/uploadFile")

router.post("/product", auth, uploadFile("image"), addProduct)
router.get("/product", getProducts)
router.get("/product/:id", getProduct)
router.patch("/product/:id", auth, uploadFile("image"), updateProduct)
router.delete("/product/:id", deleteProduct)

router.post("/profile", addProfile)
router.get("/profile", auth, getProfile)

router.post("/notification", notification);

router.post("/transaction", auth, buyProduct )
router.get("/transaction", auth, getTransaction)

router.post("/user", addUser)
router.get("/user", getUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

router.post("/category", addCategory)
router.get("/category", getCategories)
router.get("/category/:id", getCategory)
router.patch("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth)

module.exports = router