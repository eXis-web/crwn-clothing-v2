const express = require('express');
const app = express();
const stripe = require('stripe')('your_stripe_secret_key');
const bodyParser = require('body-parser');

// Middleware for allowing CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

// Route for handling create payment intent request
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('Error creating payment intent:', err);
        res.status(500).json({ error: 'Unable to create payment intent' });
    }
});

// Listening for requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
