import React, { useState } from 'react';
import { FaCreditCard} from 'react-icons/fa';
import StripePaymentForm from '../components/payment/StripePaymentForm';
import RazorpayPaymentForm from '../components/payment/RazorpayPaymentForm';
import PaytmPaymentForm from '../components/payment/PaytmPaymentForm';

const Members = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'stripe':
        return <StripePaymentForm />;
      case 'razorpay':
        return <RazorpayPaymentForm />;
      case 'paytm':
        return <PaytmPaymentForm />;
      default:
        return null;
    }
  };

  return (
    <div className="py-12 bg-gray-100 h-[calc(100vh-62px)]">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white py-4 px-6">
          <h2 className="text-2xl font-semibold">Select Payment Method</h2>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              value="stripe"
              checked={selectedPaymentMethod === 'stripe'}
              onChange={handlePaymentMethodChange}
              className="mr-2 form-radio text-blue-500"
            />
            <label htmlFor="stripe" className="text-blue-500 cursor-pointer">
              <FaCreditCard className="w-6 h-6 mr-1" />
              Stripe
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              value="razorpay"
              checked={selectedPaymentMethod === 'razorpay'}
              onChange={handlePaymentMethodChange}
              className="mr-2 form-radio text-blue-500"
            />
            <label htmlFor="razorpay" className="text-blue-500 cursor-pointer">
              {/* <FaCreditCardFront className="w-6 h-6 mr-1" /> */}
              Razorpay
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="paytm"
              checked={selectedPaymentMethod === 'paytm'}
              onChange={handlePaymentMethodChange}
              className="mr-2 form-radio text-blue-500"
            />
            <label htmlFor="paytm" className="text-blue-500 cursor-pointer">
              {/* <FaCreditCardBack className="w-6 h-6 mr-1" /> */}
              Paytm
            </label>
          </div>
        </div>
        <div className="px-6 py-2">{renderPaymentForm()}</div>
      </div>
    </div>
  );
};

export default Members;
