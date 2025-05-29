import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
      <article>
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Tasty Crunch Makhana</strong> is committed to protecting your privacy. This policy describes how we collect and use your personal data.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="information-we-collect">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect your name, email, phone number, and address to fulfill your orders.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="payment">
            2. Payment
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All payments are processed securely through Razorpay. We do not store card or bank details.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="data-protection">
            3. Data Protection
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your data is stored securely and will never be shared with third parties without your consent.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="contact">
            4. Contact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For privacy concerns, email us at{" "}
            <a
              href="mailto:wecaretastycrunch@gmail.com"
              className="text-blue-600 hover:underline"
              aria-label="Send email to wecaretastycrunch@gmail.com"
            >
              wecaretastycrunch@gmail.com
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
