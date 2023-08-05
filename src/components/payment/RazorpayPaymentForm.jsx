// src/components/PaymentForm.js
import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

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

      const response = await api.post('/users/payment/razorpay', { amount: amountInPaise });
      const { id: order_id } = response.data;
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: 'INR',
        name: 'IT Walle',
        description: 'Transaction to became a member',
        image:
          'https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1690868684693.png?alt=media&token=bbfdb9ff-204a-4b59-a6d5-05c6d7792c44', // Add your company logo URL here
        order_id,
        callback_url:`${import.meta.env.VITE_API_URL}/users/razorpay/callback`,
        handler: async (response) => {
          // Handle the payment success here
          toast.success("Payment Succeesfull", {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar:false, // Hide the progress bar
          });
          setAmount("")
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
        toast.error("Payment UnSucceesfull", {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar:false, // Hide the progress bar
          });
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
