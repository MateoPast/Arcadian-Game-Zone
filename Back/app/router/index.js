/******************************************/
/*        Main router configuration       */
/******************************************/

const express = require("express");

const APIRouter = require("./API");
const errorRouter = require("./error");

const router = express.Router();

router.use("/API", APIRouter);
//router.use("*", errorRouter);

module.exports = router;