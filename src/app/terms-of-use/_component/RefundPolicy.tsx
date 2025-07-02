import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";

const RefundPolicy = () => {
  const { data: generalSettings, isLoading, isError } = useGeneralSettings();
  const GeneralSettings: WooCommerceSetting[] = generalSettings;

  return (
    <div className="text-[#667085]">
      <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-2">
        NEST AND WHEELS AUTO COMPONENTS LIMITED REFUND POLICY
      </h3>
      <p className="text-xs md:text-sm xl:text-base mb-4">
        This Refund Policy shall become effective from 30 May 2025 until updated
        or reviewed.
      </p>

      <p className="text-xs md:text-sm xl:text-base mb-4">
        Welcome to{" "}
        <strong> Nest and Wheels Auto Component Ltd (“Nest & Wheels”).</strong>{" "}
        {""}
        We are dedicated to customer satisfaction across all our product lines,
        including motor parts, automotive fluids (e.g., motor oils), and vehicle
        sales. This Refund Policy outlines the terms for returns, refunds, and
        cancellations for purchases processed via any of our payment
        facilitators.
      </p>

      <hr className="my-4 border-gray-300" />

      <ol className="list-item space-y-2 leading-[1.8] text-xs md:text-sm xl:text-base">
        <li>
          <span className="font-bold">1. Product Categories Covered</span>{" "}
          <br></br>
          <h6 className="leading-[1.8]">
            This policy applies to the following types of purchases:
          </h6>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              <span className="font-medium text-md">Motor Parts:</span>{" "}
              Aftermarket or OEM parts including filters, spark plugs,
              batteries, etc.
            </li>
            <li>
              <span className="font-medium text-md">Motor Oils & Fluids: </span>{" "}
              Engine oil, transmission fluid, coolant, etc.
            </li>
            <li>
              <span className="font-medium text-md">Vehicle Sales: </span> New
              or used vehicles, including online deposits and down payments.
            </li>
          </ul>
        </li>

        <li>
          <span className="font-bold">2. Refunds for Motor Parts</span>
          <p className="mt-1">
            You may request a refund under the following conditions:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>The part is defective or damaged upon delivery</li>
            <li>You received the wrong item</li>
            <li>
              The part does not match the vehicle compatibility stated at
              purchase.
            </li>
          </ul>

          <p className="font-bold">Eligibility Requirements:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Return request must be made within<strong>5 – 7 days</strong>{" "}
              after delivery.
            </li>
            <li>
              Item must be <strong>unused, uninstalled,</strong> and in original
              packaging
            </li>
            <li>Include proof of purchase</li>
          </ul>

          <p className="font-bold">Non-Refundable Motor Parts:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Installed or used parts</li>
            <li>Items damaged due to improper installation</li>
            <li>Special orders or non-stocked parts</li>
          </ul>
        </li>

        <li>
          <span className="font-bold">3. Items Not Eligible for Refund</span>
          <p className="mt-1">
            Due to safety, legal, and hygiene considerations, we do{" "}
            <strong>not</strong> accept returns for motor oils and fluids once
            delivered, except in cases of:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Incorrect product shipped</li>
            <li>Product leakage or damage in transit</li>
            <li>Expired product (if not indicated at purchase)</li>
          </ul>

          <p className="font-bold">Return Eligibility:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Must be <strong>unopened, sealed,</strong> and reported within{" "}
              <strong>5 days</strong> of delivery
            </li>
            <li>Photos must be provided as proof of damage or defect</li>
          </ul>
        </li>

        <li>
          <span className="font-bold">
            4. Refunds and Cancellations for Car Sales
          </span>
          <p className="mt-1">
            Car purchases (including deposits or down payments made online) are
            subject to the following:
          </p>
          <p className="font-bold">Deposits/Down Payments:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Refundable <strong>only if the sale is not finalized</strong> due
              to reasons outside the buyer’s control (e.g., financing denial,
              seller withdrawal)
            </li>
            <li>
              Cancellations initiated by the buyer may incur a{" "}
              <strong>non-refundable fee</strong> ([e.g., 5–10%] of the deposit)
            </li>
          </ul>
        </li>

        <li>
          <span className="font-bold">5. Refund Process</span>
          <p className="mt-1">To request a return or refund:</p>
          <p className="mt-1">
            <span className="font-semibold">Email:</span>{" "}
            amarachinjoku@nestandwheels.com.ng
          </p>
          <p className="mt-1">
            <span className="font-semibold">Phone:</span> 09061139596
          </p>
          <p className="mt-1">
            <span className="font-semibold">Return Portal:</span>{" "}
            https://www.nestandwheels.com/
          </p>
          <p className="mt-1">Please provide:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Order number or receipt</li>
            <li>Reason for return</li>
            <li>Photos (if applicable)</li>
          </ul>
          <p className="mt-1">
            <p className="mt-1">
              We will review your request and respond within{" "}
              <strong> 3–5 business days.</strong>
            </p>
          </p>
        </li>

        <li>
          <span className="font-bold">6. Return Shipping</span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              For defective, damaged, or incorrect items, return shipping will
              be covered by us.
            </li>
            <li>
              For other approved returns, the customer is responsible for return
              shipping costs.
            </li>
            <li>Use a trackable shipping method and retain proof of return.</li>
          </ul>
        </li>

        <li>
          <span className="font-bold">7. Refund Method & Timeline</span>
          <p className="mt-1">
            Approved refunds will be processed via our payment facilitator to
            the original payment method within 7–14 business days, depending on
            your bank/card provider.
          </p>
        </li>

        <li>
          <span className="font-bold">8. Dispute Resolution</span>
          <p className="mt-1">
            If you are not satisfied with the outcome of your refund request,
            you may initiate a formal dispute through the payment facilitator
            utilized or your card issuer. However, we recommend contacting us
            first to resolve the matter directly.
          </p>
        </li>

        <li>
          <span className="font-bold">9. Policy Updates/Review</span>
          <p className="mt-1">
            Next & Wheels reserves the right to amend this Refund Policy at any
            time. Any updates will be posted to our website and become effective
            immediately.
          </p>
        </li>
      </ol>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-xs md:text-sm xl:text-base mb-2">
          Contact Us via the following contact details:
        </h4>
        <p className="text-xs font-semibold md:text-sm xl:text-base">
          Nest & Wheels Autos.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm xl:text-base">
          <li>
            <span className="font-semibold">Email:</span>{" "}
            amarachinjoku@nestandwheels.com.ng
          </li>
          <li>
            <span className="font-semibold">Phone:</span> 09061139596
          </li>
          <li>
            <span className="font-semibold">Website:</span>{" "}
            https://www.nestandwheels.com/
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicy;
