import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

const StudentCart = () => {
  const [selectedClasses, refetch] = useCart();

  const totalPrice = selectedClasses.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/selected-classes/${classId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full md:max-w-xl lg:max-w-screen-xl lg:me-auto sm:mx-auto lg:mx-0">
      <div className="font-extrabold text-lg m-4 flex justify-between">
        <p>
          Total Price: <span className="text-red-500">${totalPrice}</span>
        </p>
        <p>
          <button className="btn btn-color text-white">Pay</button>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra lg:text-base text-center">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {selectedClasses.map(
              ({ _id, availableSeats, instructorName, name, price }, index) => (
                <tr key={_id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{instructorName}</td>
                  <td>{availableSeats}</td>
                  <td className="text-red-500 ">${price}</td>
                  <td className="flex justify-center">
                    <button
                      className="hover:cursor-pointer text-red-500 text-lg "
                      onClick={() => handleDelete(_id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCart;
