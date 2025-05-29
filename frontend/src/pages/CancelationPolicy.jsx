import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>

      <p className="mb-4">
        At <strong>Tasty Crunch Makhana</strong>, we begin preparing your order immediately after confirmation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Time Limit</h2>
      <p className="mb-4">
        Orders can be canceled within <strong>1 hour</strong> of placement. After that, cancellations are not possible.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How to Cancel</h2>
      <p className="mb-4">
        To cancel, email <strong>wecaretastycrunch@gmail.com</strong> with your order ID within 1 hour.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Refunds</h2>
      <p className="mb-4">
        If your cancellation is eligible, a refund will be initiated within <strong>7–10 business days</strong>.
      </p>
    </div>
  );
};

export default CancellationPolicy;
