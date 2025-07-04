import React from "react";

const DeliveryReturn = () => {
  return (
    <div className="text-[#667085]">
      <h3 className="font-semibold text-center text-sm md:text-base xl:text-lg mb-4">
        DELIVERY, SHIPPING & RETURN POLICY
      </h3>

      <p className="text-sm mb-4">
        Delivering your goods to you swiftly and safely is so important to us.
        We value every single customer and that&apos;s why we trust our
        deliveries to our carefully selected couriers. That is also why we
        require that your orders be received and signed for by you. If you will
        not be there personally, please let us know if you have an alternative
        recipient (i.e. colleague, neighbour, etc.) who can receive the
        delivery.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">
                Orders Below – ₦3,000,000
              </th>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">
                Orders Above – ₦3,000,000
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-6 py-2 align-top">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Standard Delivery Method costs ₦15,000.00 within Lagos.
                  </li>
                  <li>
                    Onforward Delivery Method costs ₦20,000.00 within Lagos.
                  </li>
                  <li>Order Arrival is (2 - 4 business days) within Lagos.</li>
                  <li>The cost of Delivery outside Lagos is negotiable.</li>
                  <li>Order Arrival is (5 - 7 business days) outside Lagos.</li>
                  <li>
                    Orders placed after 12pm will begin processing the next
                    business day.
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 px-6 py-2 align-top">
                <ul className="list-disc list-inside space-y-2">
                  <li>Standard Delivery Method is free within Lagos.</li>
                  <li>Onforward Delivery Method is free within Lagos.</li>
                  <li>Order Arrival is (2 - 4 business days) within Lagos.</li>
                  <li>Standard Delivery Method outside Lagos is negotiable.</li>
                  <li>Order Arrival is (5 - 7 business days) outside Lagos.</li>
                  <li>
                    Orders placed after 12pm will begin processing the next
                    business day.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="font-bold text-md">Other Delivery Information</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Nest and Wheels is not responsible for any damages caused after
            delivery.
          </li>
          <li>
            Nest and Wheels bears no responsibility for goods signed by an
            alternative person.
          </li>
          <li>
            All claims for shortages or damages must be reported to customer
            service on the day of delivery.
          </li>
          <li>
            We are unable to redirect orders once items have been shipped.
          </li>
          <li>
            If you have any further queries regarding Nest and Wheels delivery,
            kindly contact our customer service representative through email to
            amarachinjoku@nestandwheels.com.ng
          </li>
        </ul>
      </div>

      <div className="mt-2">
        <p className="font-bold text-md mb-2">Return:</p>
        <p className="text-sm mb-2">
          Our policy includes replacement of factory-defective products.
          However, we want to emphasize that we do not assume responsibility for
          damaged goods after use. We also do not take responsibility for damage
          products after delivery has been confirmed.
        </p>
      </div>
    </div>
  );
};

export default DeliveryReturn;
