import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleInitiatePayment = async () => {
    const apiKey = "84010914ef8f8a0676c09e2f5b619b5dfdb4569b502807c74bbb8fd0f201cf1c";

    try {
      const response = await axios.post(
        "https://api.africastalking.com/version1/mobile/payment/b2c/request",
        {
          username: "eyong",
          productName: "Bus Ticket",
          recipients: [
            {
              phoneNumber: phoneNumber,
              currencyCode: "UGX",
              amount: 1000
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey
          }
        }
      );

      // Extract the payment URL from the response and set it in state
      setPaymentUrl(response.data[0].providerChannel);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
      {paymentUrl ? (
        <a href={paymentUrl}>Click here to complete payment</a>
      ) : (
        <form onSubmit={handleInitiatePayment}>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
