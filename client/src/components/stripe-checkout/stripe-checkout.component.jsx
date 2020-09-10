import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const stripePrice = price * 100;
  const publishKey =
    "pk_test_51HHwGzBrhswYPyxgewHOPVKDCRTTNHCvLEcWeCQcSNemdVHz4shEpoRY4gKpKSjegKnDRGRrt0bCuuwsB5G20Cea009jKConVB";

  const onToken = (token) => {
    console.log(token);
    axios({
      url: "http://localhost:5000/payment",
      method: "post",
      data: {
        amount: stripePrice,
        token,
      },
    })
      .then((response) => alert("Payment Successful!!"))
      .catch((error) => {
        console.log("Payment Error: ", JSON.parse(error));
        alert("There was an issue with Payment. Please use proper Credit Card");
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Crwn Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={stripePrice}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishKey}
    />
  );
};

export default StripeCheckoutButton;
