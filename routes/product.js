const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters
} = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
//rating
router.put("/product/star/:productId", authCheck, productStar);

//produits associés
router.get("/product/related/:productId", listRelated);

//recherche de produit page Home
router.post("/recherche/filtre", searchFilters);

module.exports = router;
