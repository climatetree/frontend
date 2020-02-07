import React, { useEffect } from "react";
import Nav from "./landingComponents/Nav";
import FirstScreen from "./landingComponents/FirstScreen";
import IntroScreen from "./landingComponents/IntroScreen";
import ExploreScreen from "./landingComponents/ExploreScreen";
import Footer from "./landingComponents/Footer";
import "../styles/Landing.css";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
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
    });
  }, []);

  return (
    <div id='LandingPage'>
      <Nav />
      <FirstScreen />
      <IntroScreen />
      <ExploreScreen />
      <Footer />
    </div>
  );
}

export default App;
