import { useState } from "react";
import useManageClasses from "../../../hooks/useManageClasses";

const ManageClasses = () => {
  const { manageClasses = [], refetch } = useManageClasses();
  const [feedbackText, setFeedbackText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleFeedback = (id) => {
    setSelectedClassId(id);
    setShowModal(true);
  };

  const submitFeedback = () => {
    fetch(
      `https://summer-camp-school-server-rosy-one.vercel.app/pending-classes/${selectedClassId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: feedbackText,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowModal(false);
        // Handle success or perform any other actions
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        // Handle error
      });
  };

  console.log(manageClasses);
  const handleApprove = (id) => {
    fetch(
      `https://summer-camp-school-server-rosy-one.vercel.app/pending-classes/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      }
    )
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
    fetch(
      `https://summer-camp-school-server-rosy-one.vercel.app/pending-classes/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "denied" }),
      }
    )
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

  //   const disabledButtons = (id) => {};
  const handlePostClass = (data) => {
    fetch("https://summer-camp-school-server-rosy-one.vercel.app/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error posting class:", error);
      });
  };

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
                      handlePostClass({
                        image,
                        name,
                        price,
                        availableSeats,
                        instructorName,
                        instructorEmail,
                      });
                    }}
                    disabled={status === "pending" ? false : true}
                    className="btn btn-color text-white btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(_id)}
                    disabled={status === "pending" ? false : true}
                    className="btn btn-color text-white btn-sm"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleFeedback(_id)}
                    className="btn btn-color text-white btn-sm"
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-gray-700  rounded shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4">Provide Feedback</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Enter your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-primary mr-2"
                onClick={submitFeedback}
                disabled={!feedbackText} // Disable button if feedbackText is empty
              >
                Confirm
              </button>
              <button
                className="btn bg-rose-500 hover:bg-rose-700 "
                onClick={() => {
                  setShowModal(false);
                  setFeedbackText(""); // Reset feedback text on modal close
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
