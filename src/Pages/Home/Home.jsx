import FaQ from "./FaQ";
import Slider from "./Slider/Slider";
import TopClasses from "./TopClasses/TopClasses";
import TopInstructors from "./TopInstructors/TopInstructors";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <TopClasses></TopClasses>
      <TopInstructors></TopInstructors>
      <FaQ></FaQ>
    </div>
  );
};

export default Home;
