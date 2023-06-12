import { useEffect, useState } from "react";

const Instructors = () => {
  //TODO: add setLoading
  const [instructors, setInstructors] = useState([]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/instructors")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstructors(data);
        // setLoading(false);
      });
  }, []);

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10   ">
      {instructors.map(({ _id, email, image, name }) => (
        <div key={_id} className="card  bg-base-100 shadow-xl glass">
          <figure className="w-full h-full object-cover p-4">
            <img
              className="w-full h-full rounded-xl transition-transform duration-500 transform hover:scale-110 
            "
              src={image}
              alt="Instructor"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="font-extrabold text-4xl">{name}</h2>
            <p className="text-xl">Email: {email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instructors;
