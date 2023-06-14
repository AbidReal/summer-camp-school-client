import useCart from "../../../hooks/useCart";

const StudentCart = () => {
  const [selectedClasses] = useCart();
  const totalPrice = selectedClasses.reduce((sum, item) => item.price + sum, 0);
  return (
    <div>
      <div className="font-extrabold text-lg m-4 flex justify-between">
        <p>
          Total Price: <span className="text-red-500">${totalPrice}</span>
        </p>
        <p>
          <button className="btn btn-color text-white">Pay</button>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra lg:text-base">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>
                Desktop Support Technician and you best friend. There is a well
                known saying that you are what you eat
              </td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCart;
