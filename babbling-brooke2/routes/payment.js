// Import our Controllers
const paymentController = require('../controllers/payment');
const postPaymentController = require('../controllers/postPayment');

module.exports = async function (fastify, options) {
  fastify.get('/payment/checkout-session/:name', paymentController.getCheckoutSession);

  fastify.get('/payment/webhook-checkout', paymentController.getCheckoutSession);

  // fastify.get('/payment/postPurchase', paymentController.postPurchase);

  // fastify.get('/payment/verify-coupon', paymentController.verifyCoupon);
};
