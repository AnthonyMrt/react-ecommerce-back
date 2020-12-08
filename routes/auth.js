const express = require("express");
const { json } = require("body-parser");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// const myMiddleware = (res, req, next) => {
//   console.log("Im a middleware YAY");
//   next();
// };

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

// router.get("/testing", myMiddleware, (req, res) => {
//   res.json({
//     data: "YOU SUCCESSFULLY TRIED MIDDLEWARE"
//   });
// });

module.exports = router;
