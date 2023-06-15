import axios from "axios";
import { useEffect, useState } from "react";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    // Fetch the data from the server
    axios
      .get("/pending-classes")
      .then((response) => {
        // Set the fetched data to the state
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  return (
    <div>
      <h2>Manage Classes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Available Seats</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.name}</td>
              <td>{classItem.price}</td>
              <td>{classItem.availableSeats}</td>
              <td>{classItem.instructorName}</td>
              <td>{classItem.instructorEmail}</td>
              <td>
                <img src={classItem.image} alt={classItem.name} />
              </td>
              <td>{classItem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
