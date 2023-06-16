import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const TopInstructors = () => {
  const [instructors, setinstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-instructors")
      .then((response) => response.json())
      .then((data) => setinstructors(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="text-center font-extrabold text-5xl pt-10 lg:pt-40 pb-4 lg:pb-10">
        Popular Classes
      </div>
      <Swiper
        breakpoints={{
          // For small device
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          // For larger device
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiper custom-container"
      >
        {instructors.map(({ _id, email, image, name }) => (
          <SwiperSlide key={_id}>
            <div className="card bg-base-100 shadow-xl h-full">
              <figure className="w-full h-96 lg:h-[600px] mt-10 p-4 overflow-visible">
                <img
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 transform hover:scale-110 "
                  src={image}
                  alt="Instructor"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="font-extrabold text-4xl">{name}</h2>
                <p className="text-xl">Email: {email}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopInstructors;
