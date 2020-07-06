const paypal = require('@paypal/checkout-server-sdk');


module.exports = async function payment(fastify, opts) {
  // Creating an environment
  let clientId =
    'AS8sFDWaGYjHUZF3xxN9oeCU7l7x-XY4sb_XEKnNwuCqtZ3QJUu9MDHCvTGrfLZDBEWVfPZGx6NDftKm';
  let clientSecret =
    'ECbsaYygyFL2sonBijnGvkmzw1LPQsR4wIjYB6XxZ-IHyuqnlgGYCwQ8Ylf4wzfAqaMJxF03cq5ThS73';



  // This sample uses SandboxEnvironment. In production, use LiveEnvironment
  let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  let client = new paypal.core.PayPalHttpClient(environment);

  // CREATE ORDER
  fastify.post('/orders/create', async function (req, res) {
    const subTotal = parseInt(req.body.total);
    const tax = subTotal * 0.13;
    const total = subTotal + tax;
    var products = req.body.products.map(product => {
      return {
          name: product.name,
          description: "Product Description",
          unit_amount: {
            currency_code: 'USD',
            value: product.price,
          },
          genre: product.genre,
          quantity: '1',
          category: 'DIGITAL_GOODS'
      };
    });
    console.log(products);
    console.log(subTotal);
    // Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      application_context: {
        return_url: 'http://localhost:8080',
        cancel_url: 'http://localhost:8080/cart',
        brand_name: 'Deux Fractales Audio',
        locale: 'en-US',
        landing_page: 'BILLING',
        user_action: 'CONTINUE',
      },
      purchase_units: [
        {
          reference_id: 'PUHF', // change this
          description: 'Deux Fractales Beat',

          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: subTotal,
              },
              tax_total: {
                currency_code: 'USD',
                value: tax,
              },
            },
          },
          items: products,
        },
      ],
    });

    // Call API with your client and get a response for your call
    let createOrder = async function () {
      let response = await client.execute(request);
      
      // console.log(`Response: ${JSON.stringify(response)}`);
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      // console.log(`Order: ${JSON.stringify(response.result)}`);
      
      res.send({ orderID: response.result.id });
    };
    createOrder();
  }),
  
  fastify.post('/orders/payment', async function (req, res) {

    let captureOrder = async function (orderId) {
      request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
      // Call API with your client and get a response for your call
      let response = await client.execute(request);
      
      // console.log(`Response: ${JSON.stringify(response)}`);
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(`Capture: ${JSON.stringify(response.result)}`);
      
      res.send({ 
        fullName: response.result.purchase_units[0].shipping.name.full_name,
      });
    };

    captureOrder(req.body.orderID);
  });

};
