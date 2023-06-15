import useManageClasses from "../../../hooks/useManageClasses";

const ManageClasses = () => {
  const { manageClasses = [], refetch } = useManageClasses();

  console.log(manageClasses);
  const handleApprove = (id) => {
    fetch(`http://localhost:5000/pending-classes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
        }
      })
      .catch((error) => {
        console.error("Error approving class:", error);
      });
  };
  const handleDeny = (id) => {
    fetch(`http://localhost:5000/pending-classes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "denied" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
        }
      })
      .catch((error) => {
        console.error("Error denying class:", error);
      });
  };
  const handleFeedback = (id) => {
    console.log(id);
  };

  //   const disabledButtons = (id) => {};
  const handlePostClass = () => {};

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>#</label>
            </th>
            <th className="hidden lg:block">Instructor</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {manageClasses.map(
            (
              {
                _id,
                image,
                name,
                price,
                availableSeats,
                instructorName,
                instructorEmail,
                status,
              },
              index
            ) => (
              <tr key={_id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td className="hidden lg:block">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{instructorName}</div>
                      <div className="text-sm opacity-50">
                        {instructorEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {name}
                  <br />
                </td>
                <td>{availableSeats}</td>
                <td>${price}</td>

                <td>
                  {status === "pending"
                    ? "pending"
                    : status === "denied"
                    ? "denied"
                    : status === "approved" && "approved"}
                </td>
                <td className="flex flex-col">
                  <button
                    onClick={() => {
                      handleApprove(_id);
                      handlePostClass();
                    }}
                    disabled={status === "pending" ? false : true}
                    className="btn btn-color btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(_id)}
                    disabled={status === "pending" ? false : true}
                    className="btn btn-color btn-sm"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleFeedback(_id)}
                    className="btn btn-color btn-sm"
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
