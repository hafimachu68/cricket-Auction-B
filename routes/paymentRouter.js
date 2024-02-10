var express = require('express');
const { userAuth } = require('../midlware/authorization');
const {orders,success}=require('../controllers/paymentController')
var router = express.Router();

router.post('/orders',userAuth,orders)
router.post('/success',userAuth,success)










module.exports = router;
