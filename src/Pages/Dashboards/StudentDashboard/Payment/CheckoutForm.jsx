import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ selectedClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
      console.log("selected class", selectedClass);
    }
  };
  console.log("selected class", selectedClass);

  return (
    <div className="payment-card bg-gray-800 glass rounded-lg p-4">
      <div className="card-header">
        <h3 className="text-white text-xl font-bold">Payment Card</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="card-input border p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#FFF",
                    "::placeholder": {
                      color: "#9CA3AF",
                    },
                  },
                  invalid: {
                    color: "#EF4444",
                  },
                },
              }}
            />
          </div>
          <button type="submit" disabled={!stripe} className="btn   mt-4">
            Pay
          </button>
        </form>
        {cardError && <p className="text-red-500 ml-10 ">{cardError}</p>}
      </div>
    </div>
  );
};

export default CheckoutForm;
