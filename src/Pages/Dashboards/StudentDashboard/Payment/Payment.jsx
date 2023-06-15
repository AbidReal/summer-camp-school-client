import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: Provide Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

const Payment = () => {
  return (
    <div className="w-full">
      <div>
        <div>
          <div>
            <Elements stripe={stripePromise}>
              <div>
                <CheckoutForm />
              </div>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
