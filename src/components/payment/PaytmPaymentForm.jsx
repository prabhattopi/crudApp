import React, { useState } from 'react';
import axios from 'axios';


const PaytmPaymentForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    // Form validation
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than 0.');
      return;
    }

    // Validate mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      setErrorMessage('Invalid mobile number. Please enter a 10-digit mobile number.');
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email address. Please enter a valid email.');
      return;
    }

    // If all validations pass, proceed with payment
    try {
      const response = await axios.post('/api/paytm/payment', {
        mobileNumber,
        email,
        amount,
      });
      console.log(response.data); 
      // The response will contain the transaction token
      // Redirect the user to the Paytm payment page using the received transaction token
    } catch (error) {
      console.error('Error while processing the payment:', error);
    }
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mt-2 p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="mobileNumber">
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Proceed to Pay
      </button>
    </form>
  );
};

export default PaytmPaymentForm;

