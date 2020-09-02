const paypal = require('@paypal/checkout-server-sdk');
const axios = require('axios');

module.exports = async function payment(fastify, opts) {
  // Creating an environment
  // put these in .env
  const clientID =
    'AS8sFDWaGYjHUZF3xxN9oeCU7l7x-XY4sb_XEKnNwuCqtZ3QJUu9MDHCvTGrfLZDBEWVfPZGx6NDftKm';
  const clientSecret =
    'ECbsaYygyFL2sonBijnGvkmzw1LPQsR4wIjYB6XxZ-IHyuqnlgGYCwQ8Ylf4wzfAqaMJxF03cq5ThS73';
  const webhookID = '4U618991LA200371T';
  // let clientId = process.env.PAYPAL_CLIENT_ID;
  // let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // This sample uses SandboxEnvironment. In production, use LiveEnvironment
  let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  let client = new paypal.core.PayPalHttpClient(environment);

  // CREATE ORDER
  fastify.post('/orders/create', async function (req, res) {
    const subTotal = parseInt(req.body.total);
    const tax = subTotal * 0.13;
    const total = subTotal + tax;
    var products = req.body.products.map((product) => {
      return {
        name: product.name,
        description: 'Product Description',
        unit_amount: {
          currency_code: 'USD',
          value: product.price,
        },
        genre: product.genre,
        quantity: '1',
        category: 'DIGITAL_GOODS',
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
    }),
    fastify.post('/order/verify', async function (req, res) {
      // GET new access token
      let getAccessToken = async (clientID, clientSecret) => {
        return await axios({
          url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
          method: 'post',
          headers: {
            // Accept: 'application/json',
            'Accept-Language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientID,
            password: clientSecret,
          },
          params: {
            grant_type: 'client_credentials',
          },
        }).then(
          (response) => {
            return {
              accessToken: response.data.access_token,
              expiration: response.data.expires_in,
            };
          },
          (error) => {
            console.log(error);
          }
        );
      };

      // verify POST requests
      let verifyWebhook = async (request, accessToken, webhookID) => {
        return await axios({
          url:
            'https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature',
          method: 'post',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          // try req.body, if that dosen't work you have to parse the req.body before sending
          data: JSON.stringify({
            auth_algo: request.headers['paypal-auth-algo'],
            cert_url: request.headers['paypal-cert-url'],
            transmission_id: request.headers['paypal-transmission-id'],
            transmission_sig: request.headers['paypal-transmission-sig'],
            transmission_time: request.headers['paypal-transmission-time'],
            webhook_id: webhookID,
            webhook_event: request.body,
          }),
        }).then(
          (response) => {
            return {
              status: response.data.verification_status,
              orderID: request.body.resource.links[2].href,
            };
          },
          (error) => {
            console.log(error);
          }
        );
      };

      // parse req.body and find URL for GET request
      let orderDetails = async (orderID, accessToken) => {
        return await axios({
          url: orderID,
          method: 'get',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }).then(
          (response) => {
            return {
              purchasedItems: response.data.purchase_units[0].items,
              email: response.data.payer.email_address,
              todaysDate: response.data.update_time, // I'm not sure if this is correct
              fullName: `${response.data.payer.given_name} ${response.data.payer.surname}`,
              address: response.data.payer.address,
              country: response.data,
              purchases: response.data,
              subtotal: response.data,
            };
          },
          (error) => {
            console.log(error);
          }
        );
      };

      // retrieve access token
      // 1) store and refresh this
      let token = await getAccessToken(clientID, clientSecret); // token.accessToken, token.expiration

      // check verification, and send email
      // 2. if this step fails, the request is not valid
      // 3. Perform additional checks besides paypal verificatoin (see if payment.capture.complete, and POST req)
      let verification = await verifyWebhook(
        event,
        token.accessToken,
        webhookID
      ); // verification.status, verification.orderID

      if (verification.status === 'SUCCESS') {
        let getOrderDetails = await orderDetails(
          verification.orderID,
          token.accessToken
        );
        console.log(getOrderDetails.address);
        // return sendEmail(orderDetails);
      }
    });
};
