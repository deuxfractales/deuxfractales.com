async function stripe (fastify, options){

    
	const stripe = require('stripe')('sk_test_51HPibVKRlkNsphUI7E8xkr5CoQcWbZ8l8F2JBmqHlwpOcppkq4LH4acINPkRk5lf0YyD57wOctoiWymxupiJZL0e00wAVBC3V8');



	fastify.get('/stripe/onboard', async (request, reply) => {
		const account = await stripe.accounts.create({
			type: 'express',
		});
		let accountNumber = account.id

		const accountLinks = await stripe.accountLinks.create({
  			account: accountNumber,
			// Be sure to swap testing URLs for HTTPS URLs before going live.
  			refresh_url: 'https://example.com/reauth',
  			return_url: 'https://example.com/return',
  			type: 'account_onboarding',
		});
		reply.send(accountLinks.url)
	});
	fastify.get('/stripe/balance/:id', async (request, reply) => {
		let accountNumber = request.params.id
		const balance = await stripe.balance.retrieve({
			stripeAccount: accountNumber
		})
		const accountInformation = {
			availableBalance: `${balance.available[0].amount}`,
			pendingBalances: `${balance.pending[0].amount}`
		}
		console.log(`balance info for account:${accountNumber} sent successfully `)
		reply.send(accountInformation)
	} )

}

module.exports = stripe
