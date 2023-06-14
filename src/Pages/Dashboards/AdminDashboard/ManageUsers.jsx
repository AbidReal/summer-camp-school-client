import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: users = [],
    // refetch
  } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("http://localhost:5000/users");
    return res.data;
  });
  const [disabledButtons, setDisabledButtons] = useState([]);

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          setDisabledButtons((prevDisabledButtons) => [
            ...prevDisabledButtons,
            id,
          ]);
          //   refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Made Admin`,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeInstructor = (id) => {
    fetch(`http://localhost:5000/users/instructor/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          setDisabledButtons((prevDisabledButtons) => [
            ...prevDisabledButtons,
            id,
          ]);
          //   refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Made Instructor`,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users.map(({ _id, name, email, role }, index) => (
              <tr key={_id}>
                <th>{index + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td className="flex gap-4">
                  {role === "admin" ? (
                    "admin"
                  ) : role === "instructor" ? (
                    <>
                      instructor
                      <button
                        className="btn btn-sm btn-color text-white"
                        onClick={() => handleMakeAdmin(_id)}
                        disabled={disabledButtons.includes(_id)}
                      >
                        Make Admin
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-color text-white"
                        onClick={() => handleMakeAdmin(_id)}
                        disabled={disabledButtons.includes(_id)}
                      >
                        Make Admin
                      </button>

                      <button
                        className="btn btn-sm btn-color text-white"
                        onClick={() => handleMakeInstructor(_id)}
                        disabled={disabledButtons.includes(_id)}
                      >
                        Make Instructor
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
