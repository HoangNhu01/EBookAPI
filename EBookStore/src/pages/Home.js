import Slider from "../components/Slider";
import Products from "./Products";
import React from "react";

const Home = () => {
  return (
    <div className='home'>
      <Slider />
      <Products />
    </div>
  );
};

export default Home;
