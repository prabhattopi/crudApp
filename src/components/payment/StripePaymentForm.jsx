// src/components/PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [isValidAmount, setIsValidAmount] = useState(true); // Add state for form validation
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (amount < 1) {
      setIsValidAmount(false);
      return; // If amount is less than 1 INR, do not proceed with the payment
    } else {
      setIsValidAmount(true); // Reset validation status if amount is valid
    }

    try {
      const response = await axios.post('/create-payment-intent', { amount: amount*100 });
      const { clientSecret } = response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error('Payment failed:', result.error.message);
      } else {
        console.log('Payment successful:', result.paymentIntent);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-1 font-semibold">
          Amount (INR)
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            !isValidAmount ? 'border-red-500' : 'border-blue-500'
          }`}
        />
        {!isValidAmount && (
          <p className="text-red-500 mt-1 text-sm">Amount must be at least 1 INR.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Card Details</label>
        <div className="bg-white rounded-md p-3 border">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Pay
      </button>
    </form>
  );
};

export default StripePaymentForm;
