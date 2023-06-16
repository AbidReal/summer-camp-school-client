import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CheckoutForm = ({
  // eslint-disable-next-line react/prop-types
  selectedClass: { price, _id, selectedId, className },
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

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
      console.log(
        "price",
        price,
        "classId",
        _id,
        "selectedId",
        selectedId,
        "className",
        className
      );
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("paymentIntent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentMethod.id);
      //   const transactionId = paymentIntent.id;
      //save payment info to server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        classId: _id,
        selectedId: selectedId,
        price,
        orderStatue: "service pending",
        className: className,
        date: new Date(),
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          toast.success("Payment completed successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    }
  };
  console.log(
    "price",
    price,
    "id",
    _id,
    "selectedClassId",
    selectedId,
    "className",
    className
  );

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
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="btn   mt-4"
          >
            Pay
          </button>
        </form>
        {cardError && <p className="text-red-500 ml-10 ">{cardError}</p>}
        {transactionId && (
          <p className="text-green-500">
            Transaction Complete with transactionId: {transactionId}
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
