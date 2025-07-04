// src/pages/VerifyMobile.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyMobile = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/send-otp', { phone });
      toast.success('OTP sent successfully ✅');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/verify-otp', { phone, otp });
      toast.success('Phone verified ✅');
      localStorage.setItem('verifiedPhone', phone);
      navigate('/checkout', { state: { product } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed ❌');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Verify Your Mobile</h2>

      <input
        type="tel"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded p-2 mb-3"
        disabled={step === 2}
      />

      {step === 2 && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
      )}

      {step === 1 ? (
        <button
          onClick={handleSendOtp}
          className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
        >
          Send OTP
        </button>
      ) : (
        <button
          onClick={handleVerifyOtp}
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Verify OTP
        </button>
      )}
    </div>
  );
};

export default VerifyMobile;
