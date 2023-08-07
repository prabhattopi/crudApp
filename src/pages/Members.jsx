import React, { useState } from 'react';
import StripePaymentForm from '../components/payment/StripePaymentForm';
import RazorpayPaymentForm from '../components/payment/RazorpayPaymentForm';
import PaytmPaymentForm from '../components/payment/PaytmPaymentForm';
import ConfirmPage from './ConfirmPage';
import { useNavigate, useSearchParams } from 'react-router-dom';
const Paytmimage = "https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.jpg";
const RazorPay = "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png";
const Stripimage = "https://adfetish.com/img/cms/logos_tarjetas_v3.png";

const Members = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate=useNavigate()
  const searchQuery=useSearchParams()[0]
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
  const referenceId="sdfjsdkfjsdf"
  const handleGo=()=>{
       navigate("/")
       window.location.reload();
  }
  if(searchQuery.get("reference")){
    return (
        <div className="flex justify-center items-center min-h-[90vh]">
                <ConfirmPage handleGo={handleGo} referenceId={referenceId}/>
        </div>
    
    )
  }
  return (
    <div className="sm:py-12 bg-gray-100 h-[calc(100vh-62px)]">
      <div className="max-w-md h-full mx-auto bg-white shadow-lg sm:rounded-lg overflow-hidden sm:h-[30rem]">
        <div className="bg-blue-500 text-white py-4 px-6">
          <h2 className="text-2xl font-semibold">Select Payment Method</h2>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center mb-4 opacity-50 pointer-events-none">
            <input
              type="radio"
              value="stripe"
              checked={selectedPaymentMethod === 'stripe'}
              onChange={handlePaymentMethodChange}
              className="mr-2 form-radio text-blue-500"
            />
            <label htmlFor="stripe" className="text-blue-500 cursor-pointer">
            <img src={Stripimage} alt="Stripe" className="w-21 h-12 object-contain" />
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
              <img src={RazorPay} alt="Razorpay" className="w-20 h-13 object-contain" />
            </label>
          </div>
          <div className="flex items-center mb-2 opacity-50 pointer-events-none">
            <input
              type="radio"
              value="paytm"
              checked={selectedPaymentMethod === 'paytm'}
              onChange={handlePaymentMethodChange}
              className="mr-2 form-radio text-blue-500"
            />
            <label htmlFor="paytm" className="text-blue-500 cursor-pointer">
              
            <img src={Paytmimage} alt="Paytm" className="w-20 h-13 object-contain" />
            </label>
          </div>
        </div>
        <div className="px-6 py-2 sm:h-64 overflow-y-auto">{renderPaymentForm()}</div>
      </div>
    </div>
  );
};

export default Members;
