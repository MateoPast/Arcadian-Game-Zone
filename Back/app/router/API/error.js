const express = require('express');
const router = express.Router();
const errorController = require('../../controller/error');

router.use("*", (req, res, next) => {
    errorController.error_message(req, res, 'cannot find this route on this server')
});


module.exports = router;