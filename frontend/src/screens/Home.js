import React from "react";
import BannerSlider from "../components/Home/BannerSlider";
import TopProducts from "../components/Home/TopProducts";

const Home = () => {
  return (
    <section id="home">
      <BannerSlider />
      <TopProducts />
    </section>
  );
};

export default Home;
