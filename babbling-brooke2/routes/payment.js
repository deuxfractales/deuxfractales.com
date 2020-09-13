// Import our Controllers
const paymentController = require('../controllers/payment');
const postPaymentController = require('../controllers/postPayment');


module.exports = async function (fastify, options) {

  fastify.get('/payment/postPurchase', postPaymentController.postPurchase);



}

