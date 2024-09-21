import React from "react";
import AboutContent from "../components/AboutContent";
import Learning from "../components/Learning";
import References from "../components/References";
import Contact from "../components/Contact";

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AboutContent />
        <Learning />
        <References />
        <Contact />
      </div>
    </>
  );
};

export default AboutPage;
