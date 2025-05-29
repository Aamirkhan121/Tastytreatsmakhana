import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-orange-700 mb-8 text-center">
        Terms and Conditions
      </h1>

      {/* Introduction */}
      <p className="text-base leading-relaxed mb-6">
        Welcome to <strong className="text-orange-700">Tasty Crunch Makhana</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and services.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. General</h2>
        <p className="text-base leading-relaxed">
          By accessing our site or placing an order, you agree to be bound by these terms. If you do not agree with any part of the terms, please refrain from using our services.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. Product Availability</h2>
        <p className="text-base leading-relaxed">
          All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any item at any time without prior notice.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Pricing</h2>
        <p className="text-base leading-relaxed">
          Prices are listed in Indian Rupees (INR) and are subject to change without notice. All payments are processed securely through Razorpay or our authorized payment partners.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Contact</h2>
        <p className="text-base leading-relaxed">
          For any queries, feel free to reach out to our support team at: <br />
          <a href="mailto:wecaretastycrunch@gmail.com" className="text-blue-600 hover:underline">
            wecaretastycrunch@gmail.com
          </a>
        </p>
      </section>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 mt-10 text-center">
        Last updated: May 29, 2025
      </p>
    </div>
  );
};

export default TermsAndConditions;

