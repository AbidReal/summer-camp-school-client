import usePendingClasses from "../../../hooks/usePendingClasses";

const InstructorClasses = () => {
  const [pendingClasses] = usePendingClasses();
  console.log(pendingClasses);

  return (
    <div className="w-full md:max-w-xl lg:max-w-screen-xl lg:me-auto sm:mx-auto lg:mx-0">
      <div className="font-extrabold text-lg m-4 flex justify-between">
        {/* <p>
          Total Price: <span className="text-red-500">${totalPrice}</span>
        </p> */}
        {/* <p>
          <button className="btn btn-color text-white">Pay</button>
        </p> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra lg:text-base text-center">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Status</th>
              <th>feedback</th>
            </tr>
          </thead>
          <tbody>
            {pendingClasses.map(
              (
                { _id, availableSeats, name, price, status, feedback },
                index
              ) => (
                <tr key={_id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{availableSeats}</td>

                  <td className="text-red-500 ">${price}</td>
                  <td className="">
                    {status === "pending" ? (
                      "pending"
                    ) : status === "approved" ? (
                      <p className="text-green-500 ">approved</p>
                    ) : (
                      <p className="text-red-500">denied</p>
                    )}
                  </td>
                  {feedback ? <td>{feedback}</td> : <td>none</td>}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorClasses;
