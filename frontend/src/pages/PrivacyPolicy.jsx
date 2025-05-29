import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Tasty Crunch Makhana</strong> is committed to protecting your privacy. This policy describes how we collect and use your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect your name, email, phone number, and address to fulfill your orders.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Payment</h2>
      <p className="mb-4">
        All payments are processed securely through Razorpay. We do not store card or bank details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
      <p className="mb-4">
        Your data is stored securely and will never be shared with third parties without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact</h2>
      <p className="mb-4">
        For privacy concerns, email us at <strong>support@tastycrunchmakhana.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
