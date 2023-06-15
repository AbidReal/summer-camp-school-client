import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
import CheckoutForm from "./CheckoutForm";

// TODO: Provide Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("classId");
  const price = searchParams.get("price");
  const selectedClass = {
    _id: classId,
    price: price,
  };
  return (
    <div className="w-full">
      <div>
        <div>
          <div>
            <Elements stripe={stripePromise}>
              <div>
                <CheckoutForm selectedClass={selectedClass} />
              </div>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
