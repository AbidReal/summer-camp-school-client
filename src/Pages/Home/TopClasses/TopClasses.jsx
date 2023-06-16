import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TopClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-classes")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className=" text-center font-extrabold text-3xl pt-10 lg:pt-20 pb-4">
        Top Classes
      </div>
      <Swiper
        breakpoints={{
          // For small device
          640: {
            slidesPerView: 1,
          },
          // For larger device
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper custom-container "
      >
        {classes.map(({ _id, image, name, instructorName, availableSeats }) => (
          <SwiperSlide key={_id}>
            <div className="card   bg-base-100 shadow-xl h-full   ">
              <figure className="w-full h-96 lg:h-80 p-4">
                <img
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 transform hover:scale-110 "
                  src={image}
                  alt={name}
                />
              </figure>
              <div className="card-body  flex flex-col items-center justify-center">
                <h2 className="card-title">{name}</h2>
                <p className="mb-2">Instructor: {instructorName}</p>
                <p className="mb-4">Available Seats: {availableSeats}</p>
                <div className="card-actions">
                  <Link to="/classes">
                    <button className="btn text-white btn-color">
                      View Classes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopClasses;
