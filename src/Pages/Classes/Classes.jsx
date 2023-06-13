import { useEffect, useState } from "react";

const Classes = () => {
  //TODO: add setLoading
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClasses(data);
        setLoading(false);
      });
  }, []);

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
                className="card w-96 glass transition-transform duration-500 transform hover:scale-110 "
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
                    <button className="btn text-white btn-color w-full ">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Classes;
