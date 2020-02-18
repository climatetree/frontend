import React, { useEffect } from "react";
import Nav from "./Nav";
import FirstScreen from "./landingComponents/FirstScreen";
import IntroScreen from "./landingComponents/IntroScreen";
import ExploreScreen from "./landingComponents/ExploreScreen";
import Footer from "./landingComponents/Footer";
import "../styles/Landing.css";

function LandingPage() {
  useEffect(() => {
    console.log('landing page rendered')
    window.addEventListener('scroll', fadeInUp);
    return () => {
      window.removeEventListener('scroll', fadeInUp);
    }
  }, []);

  return (
    <>
      <Nav />
      <FirstScreen />
      <IntroScreen />
      <ExploreScreen />
      <Footer />
    </>
  );
}

function fadeInUp() {
  if (window.scrollY > window.innerHeight / 3) {
    document.getElementById("intro-header").classList.add("fade-in");
    const introSections = [...document.querySelectorAll(".intro")];
    for (let i = 0; i < introSections.length; i++) {
      setTimeout(() => {
        introSections[i].classList.add("fade-in", "move-up");
      }, 200 * (i + 1));
    }
  }
  if (window.scrollY > (window.innerHeight * 4) / 5) {
    document.getElementById("explore-header").classList.add("fade-in");
    const exploreTiles = [...document.querySelectorAll(".explore-tile")];
    for (let i = 0; i < exploreTiles.length; i++) {
      setTimeout(() => {
        exploreTiles[i].classList.add("fade-in", "move-up");
      }, 200 * (i + 1));
    }
  }
}

export default LandingPage;
