import React from "react";

const CancellationPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
      <article>
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Cancellation Policy
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>Tasty Crunch Makhana</strong>, we begin preparing your order immediately after confirmation.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="time-limit">
            1. Time Limit
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Orders can be canceled within <strong>1 hour</strong> of placement. After that, cancellations are not possible.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="how-to-cancel">
            2. How to Cancel
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To cancel, email{" "}
            <a
              href="mailto:wecaretastycrunch@gmail.com"
              className="text-blue-600 hover:underline"
              aria-label="Send email to wecaretastycrunch@gmail.com"
            >
              wecaretastycrunch@gmail.com
            </a>{" "}
            with your order ID within 1 hour.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3" id="refunds">
            3. Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If your cancellation is eligible, a refund will be initiated within <strong>7–10 business days</strong>.
          </p>
        </section>
      </article>
    </main>
  );
};

export default CancellationPolicy;

