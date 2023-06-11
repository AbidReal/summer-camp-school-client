// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";

import "./slider.css"; // Import custom CSS file
import { Fade } from "react-awesome-reveal";

const Slider = () => {
  return (
    <div className="h-96 lg:h-[720px] w-full relative">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper h-full"
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              src="https://i.ibb.co/R3wx553/image-2023-06-11-132355949.jpg"
              alt="Slide 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <Fade cascade direction="down">
                <p className="text-4xl font-bold ">
                  EVERY GREAT JOURNEY <br /> STARTS WITH ONE STEP!
                </p>
                <p className="mt-8 text-lg">
                  Make This summer Count <br /> And Become A Stronger Person
                </p>
              </Fade>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              src="https://img.freepik.com/free-photo/preschooler-boy-dressed-white-karate-kimono-with-orange-belt_613910-1994.jpg?w=1380&t=st=1686468521~exp=1686469121~hmac=f10bcf2f06433da44af38b8ad24e2a2d6898df29013955b4c6f50c229bbd66a8"
              alt="Slide 2"
              className="h-full w-full object-cover"
            />
            <div className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <Fade cascade direction="down">
                <p className="text-4xl font-bold uppercase ">
                  Welcome To FistZen <br />
                  Become a stronger person
                </p>
                <p className="mt-8 text-lg">
                  Here you can learn your favorite martial arts in this summer
                  and be a better person both physically and mentally
                </p>
              </Fade>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
};

export default Slider;
