import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useInstructor from "../../hooks/useInstructor";
import useAdmin from "../../hooks/useAdmin";

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClasses(data);
        setLoading(false);
      });
  }, []);

  const handleSelectedClass = (selectedClass) => {
    console.log(selectedClass);
    if (user && user.email) {
      fetch("http://localhost:5000/selected-classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            toast.success("Class selected successfully!");
          }
        });
    } else {
      toast.error("Please Login before selecting a class.");
      navigate("/login", {
        state: {
          // from: location,
          error: "Please Login before selecting a class.",
        },
      });
    }
  };

  return (
    <div className="custom-container">
      {loading ? (
        <div className="custom-container flex justify-center items-center h-screen">
          <span className="loading mx-auto  flex loading-dots loading-lg text-red-500"></span>
        </div>
      ) : (
        <div className="  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 ">
          {classes.map(
            ({ _id, availableSeats, image, instructorName, name, price }) => (
              <div
                key={_id}
                className={`card w-96 glass transition-transform duration-500 transform hover:scale-110 ${
                  availableSeats === 0 ? "bg-red-500" : ""
                }`}
              >
                <figure className="w-full h-full p-4">
                  <img
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 transform hover:scale-110 "
                    src={image}
                    alt={name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p>Instructor: {instructorName}</p>
                  <p>Available Seats: {availableSeats}</p>
                  <p>
                    Price: <span className="text-red-500">${price}</span>{" "}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        handleSelectedClass({
                          classId: _id,
                          email: user?.email,
                          availableSeats,
                          image,
                          instructorName,
                          name,
                          price,
                        })
                      }
                      className="btn text-white btn-color w-full "
                      disabled={isAdmin || isInstructor || availableSeats === 0}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Classes;
