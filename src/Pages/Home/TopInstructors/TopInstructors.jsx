import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Aos from "aos";

const TopInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(
      "https://summer-camp-school-server-rosy-one.vercel.app/top-instructors"
    )
      .then((response) => response.json())
      .then((data) => {
        setInstructors(data);
        Aos.init({ duration: 1000 });
      })
      .catch((error) => console.log(error));
  }, []);

  if (instructors.length === 0) {
    // Render loading state or fallback
    return (
      <div>
        <span className="loading mx-auto  flex loading-dots loading-lg text-red-500"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="text-center font-extrabold text-5xl pt-10 lg:pt-40 pb-4 lg:pb-10">
          Popular Instructors
        </div>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
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
              <div className="card mb-14 bg-base-100 shadow-xl h-full">
                <figure className="w-full h-[900px] lg:h-[600px] mt-10 p-4 overflow-visible">
                  <img
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 transform hover:scale-110"
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
      </div>
    </>
  );
};

export default TopInstructors;
