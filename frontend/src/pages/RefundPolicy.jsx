import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="mb-4">
        At <strong>Tasty Crunch Makhana</strong>, we strive to deliver fresh and tasty products. However, if you are not satisfied, our refund policy is as follows:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="mb-4">
        You may request a refund within <strong>7 days</strong> of delivery if the product is damaged, expired, or incorrect.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Process</h2>
      <p className="mb-4">
        Email us at <strong>wecaretastycrunch@gmail.com</strong> with your order ID and photo proof.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Timeframe</h2>
      <p className="mb-4">
        Approved refunds will be processed within <strong>7–10 business days</strong> to your original payment method.
      </p>
    </div>
  );
};

export default RefundPolicy;
