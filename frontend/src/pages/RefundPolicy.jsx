import React from "react";

const RefundPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
      <article>
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>Tasty Crunch Makhana</strong>, we strive to deliver fresh
            and tasty products. However, if you are not satisfied, please review
            our refund policy below.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="eligibility">
            1. Eligibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You may request a refund within{" "}
            <strong>7 days</strong> of delivery if the product is damaged,
            expired, or incorrect.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="process">
            2. Process
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Email us at{" "}
            <a
              href="mailto:wecaretastycrunch@gmail.com"
              className="text-blue-600 hover:underline"
              aria-label="Send email to wecaretastycrunch@gmail.com"
            >
              wecaretastycrunch@gmail.com
            </a>{" "}
            with your order ID and photo proof.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="timeframe">
            3. Timeframe
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Approved refunds will be processed within{" "}
            <strong>7–10 business days</strong> to your original payment method.
          </p>
        </section>
      </article>
    </main>
  );
};

export default RefundPolicy;

