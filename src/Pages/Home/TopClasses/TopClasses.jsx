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
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {classes.map(({ _id, image, name, instructorName, availableSeats }) => (
          <SwiperSlide key={_id}>
            <div className="card w-96 bg-base-100 shadow-xl h-full flex flex-col">
              <figure className="flex-grow-0 rounded-xl">
                <img
                  src={image}
                  alt={name}
                  className="rounded-xl p-4 w-full h-80 object-cover"
                />
              </figure>
              <div className="card-body flex-grow flex flex-col items-center justify-center">
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
