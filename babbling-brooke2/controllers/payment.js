const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const models = require('../models/beats')

exports.getCheckoutSession = async (request, reply) => {
  try {
    // 1) Get the current beat
    const beat = models.getBeat(request, reply);

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // return to homepage
      success_url: `${request.protocol}://localhost:8080/`,

      cancel_url: `${request.protocol}://localhost:8080/cart`,

      customer_email: request.body.user.email,
      line_items: [
        {
          name: `${beat.name} Type Beat`,
          // description: beat.description,
          amount: beat.pricing,
          currency: 'usd',
          quantity: 1,
        },
      ],
    });

    // 3) Create session as response
    reply.code(200).send({
      status: 'success',
      session,
    });
  } catch (error) {
    console.log(error);
  }
};

const createBookingCheckout = async (session) => {
  const beat = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = async (request, reply) => {
  const signature = request.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return reply.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  reply.status(200).json({ received: true });
};

exports.verifyCoupon = async (request, reply) => {};
