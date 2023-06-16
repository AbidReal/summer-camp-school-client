import Slider from "./Slider/Slider";
import TopClasses from "./TopClasses/TopClasses";
import TopInstructors from "./TopInstructors/TopInstructors";

const Home = () => {
  return (
    <div>
      Home with 4 sections. slider, top classes, top instructors, bonus
      <Slider></Slider>
      <TopClasses></TopClasses>
      <TopInstructors></TopInstructors>
    </div>
  );
};

export default Home;
