// src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PaytmPaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentInitialized, setPaymentInitialized] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(true);

  const handlePayment = async () => {
    try {
      if (amount <= 0) {
        setIsValidAmount(false);
        return;
      } else {
        setIsValidAmount(true);
      }

      const response = await axios.post('/create-payment', { amount });
      const { redirect_url } = response.data;
      setRedirectUrl(redirect_url);
      setPaymentInitialized(true);
    } catch (error) {
      alert('Failed to create payment');
    }
  };

  const redirectToPaytm = () => {
    if (paymentInitialized && redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Form</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Amount (INR)</label>
        <input
          type="number"
          placeholder="Enter amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
            isValidAmount ? 'border-blue-500' : 'border-red-500'
          }`}
        />
        {!isValidAmount && (
          <p className="text-red-500 mt-1 text-sm">Min amount should be 1 INR.</p>
        )}
      </div>
      <button
        onClick={handlePayment}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Pay Now
      </button>
      {redirectToPaytm()}
    </div>
  );
};

export default PaytmPaymentForm;
