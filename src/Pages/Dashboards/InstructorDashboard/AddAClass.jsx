import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_image_upload_token;
const AddAClass = () => {
  const handleToast = () => {
    toast.success("Success!! Class is in pending", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            price,
            availableSeats,
            instructorEmail,
            instructorName,
          } = data;
          const newItem = {
            name,
            price,
            availableSeats,
            instructorName,
            instructorEmail,
            image: imgURL,
            status: "pending",
          };
          console.log(newItem);
          axiosSecure.post("/pending-classes", newItem).then((data) => {
            console.log("after posting:", data.data);
            if (data.data.insertedId) {
              handleToast();
            }
          });
        }
      });
    // Handle form submission
    // fetch("http://localhost:5000/pending-classes", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.insertedId) {
    //       handleToast();
    //     }
    //   });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">
            Class Name
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded text-black"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="image">
            Class Image
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className=" file-input-bordered file-input w-full max-w-xs"
          />
          {errors.pictureUrl && (
            <span className="text-red-500">Picture URL is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded text-black"
            value={user?.displayName}
            type="text"
            id="instructorName"
            {...register("instructorName")}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="instructorEmail">
            Instructor Email
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded text-black"
            value={user?.email}
            type="email"
            id="instructorEmail"
            {...register("instructorEmail")}
          />
        </div>

        <div className="flex gap-10">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="availableSeats">
              Available Seats
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded text-black"
              type="number"
              id="availableSeats"
              {...register("availableSeats", {
                required: true,
                setValueAs: (value) => parseFloat(value),
              })}
            />
            {errors.quantity && (
              <span className="text-red-500">
                Available Quantity is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="price">
              Price
            </label>
            <input
              className=" w-36 border border-gray-300 p-2 rounded text-black"
              type="number"
              step="0.01"
              id="price"
              {...register("price", {
                required: true,
                setValueAs: (value) => parseFloat(value),
              })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
        </div>

        <button
          className=" mb-10 btn-color text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Class
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAClass;
