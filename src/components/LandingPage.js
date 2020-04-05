import React, { useEffect } from "react";
import Nav from "./Nav";
import FirstScreen from "./landingComponents/FirstScreen";
import ExploreScreen from "./landingComponents/ExploreScreen";
import Footer from "./landingComponents/Footer";
import "./Landing.css";

export default function LandingPage() {
  useEffect(() => {
    window.addEventListener("scroll", fadeInUp);
    return () => {
      window.removeEventListener("scroll", fadeInUp);
    };
  }, []);

  return (
    <>
      <Nav />
      <FirstScreen />
      <ExploreScreen />
      <Footer />
    </>
  );
}

function fadeInUp() {
  if (window.scrollY > window.innerHeight / 3) {
    document.getElementById("explore-header").classList.add("fade-in");
    const exploreTiles = [...document.querySelectorAll(".explore-tile")];
    for (let i = 0; i < exploreTiles.length; i++) {
      setTimeout(() => {
        exploreTiles[i].classList.add("fade-in", "move-up");
      }, 200 * (i + 1));
    }
  }
}
