import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51He5EMLnoh1c2p0MuMxJPjTQt6L48ZlAeS7WuiinBOixOB3Gjnjp6B2GR7jMmUqGRbD1D6yp7JyYpmvXdc3sJ8jC00fNf4Hqfn"
);

const index = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default index;
