import usePaymentHistory from "../../../hooks/usePaymentHistory";

const PaymentHistory = () => {
  const [paymentHistory, isLoading] = usePaymentHistory();

  return (
    <div>
      <div className="w-full md:max-w-xl lg:max-w-screen-xl lg:me-auto sm:mx-auto lg:mx-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Class ID</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : (
              <>
                {paymentHistory.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.classId}</td>
                    <td>{payment.price}</td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
