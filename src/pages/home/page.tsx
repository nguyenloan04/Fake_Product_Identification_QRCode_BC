import React from "react";
import Banner from "@/components/Banner";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigator from "@/components/Navigator";
import Product from "@/components/Products";
import Statistics from "@/components/Statistics";

const HomePage = () => {
  return (
    <>
      <Header />
      <Navigator />
      <span className="mt-[60px] block"></span>
      <Hero />
      <span className="mt-28 block"></span>
      <Feature />
      <span className="mt-32 block"></span>
      <Product title="Featured Products" />
      <span className="mt-60 block"></span>
      <Statistics />
      <span className="mt-52 block"></span>
      <Banner />
      <span className="mt-30 block"></span>
      <Product title="Hot Deals" />
      <span className="mt-20 block"></span>
      <Footer />
    </>
  );
};

export default HomePage;
