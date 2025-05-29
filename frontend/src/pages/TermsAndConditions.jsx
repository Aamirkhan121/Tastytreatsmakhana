import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Tasty Crunch Makhana</strong>. These Terms and Conditions govern your use of our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General</h2>
      <p className="mb-4">
        By accessing our site or placing an order, you agree to be bound by these terms. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Product Availability</h2>
      <p className="mb-4">
        All products listed are subject to availability. We reserve the right to modify or discontinue any item without notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Pricing</h2>
      <p className="mb-4">
        Prices are listed in INR and may change at any time. All payments are processed via Razorpay.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact</h2>
      <p className="mb-4">
        For any questions, contact us at <strong>support@tastycrunchmakhana.com</strong>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
