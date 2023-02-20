import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { payOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";

const useOptions = () => {
  const options = useMemo(() => ({
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }));

  return options;
};

const CheckoutForm = ({ order, successPay }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();

  const orderId = order._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      "/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          currency: "usd",
          amount: order.totalPrice,
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      return;
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: order.user.name,
          },
        },
      });

    if (stripeError) {
      toast.error(stripeError.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    dispatch(payOrder(orderId, paymentIntent));
    toast.success("Order Paid!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement options={options} />

        <button type='submit' disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
