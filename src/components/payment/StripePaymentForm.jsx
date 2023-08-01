import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Call your backend API to handle payment processing
      try {
        const response = await axios.post('/api/payment', {
          paymentMethodId: paymentMethod.id,
          amount: 1000, // Replace with the actual amount to charge
          currency: 'usd', // Replace with your desired currency
        });

        console.log(response.data);
        // Handle successful payment
      } catch (error) {
        console.error(error);
        // Handle payment error
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentForm;
