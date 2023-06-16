import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import usePaymentHistory from "../../../hooks/usePaymentHistory";

const StudentEnrolled = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const [paymentHistory] = usePaymentHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      const classIds = paymentHistory.map((payment) => payment.classId);

      // Fetch the class data for the enrolled classIds (replace with your actual API endpoint)
      const classResponses = await Promise.all(
        classIds.map((classId) => axiosSecure.get(`/classes/${classId}`))
      );

      // Extract the class information from the responses
      const enrolledClassesData = classResponses.map(
        (response) => response.data
      );

      // Update the state with the enrolled class information
      setEnrolledClasses(enrolledClassesData);
      setIsLoading(false);
    };

    fetchEnrolledClasses();
  }, [axiosSecure, paymentHistory]);

  return (
    <div>
      <div className="text-center font-extrabold text-3xl mb-10 ">
        Enrolled Classes
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="loading mx-auto loading-dots loading-lg text-red-500"></td>
              </tr>
            ) : (
              <>
                {enrolledClasses.map((classData, index) => (
                  <tr key={classData._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={classData.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{classData.name}</div>
                          <div className="text-sm opacity-50">
                            Instructor: {classData.instructorName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{classData.instructorName}</td>
                    <td>{classData.availableSeats}</td>
                    <td>{classData.price}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEnrolled;
