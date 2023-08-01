// src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(true);

  const handlePayment = async () => {
    try {
      const amountInPaise = amount * 100;
      if (amountInPaise < 100) {
        setIsValidAmount(false);
        return;
      } else {
        setIsValidAmount(true);
      }

      const response = await axios.post('/create-order', { amount: amountInPaise });
      const { id: order_id } = response.data;
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: amountInPaise,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        image:
          'https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1690868684693.png?alt=media&token=bbfdb9ff-204a-4b59-a6d5-05c6d7792c44', // Add your company logo URL here
        order_id,
        handler: async (response) => {
          // Handle the payment success here
          alert('Payment successful');
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '1234567890',
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Form</h2>
      <input
        type="number"
        placeholder="Enter amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
          !isValidAmount ? 'border-red-500' : 'border-blue-500'
        }`}
      />
      {!isValidAmount && (
        <p className="text-red-500 mt-1 text-sm">Min amount should be 1 INR.</p>
      )}
      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPaymentForm;
