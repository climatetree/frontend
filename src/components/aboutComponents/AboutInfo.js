import React from "react";
import "./AboutInfo.css";
import greg from "../../images/team/greg.jpg"
import abby from "../../images/team/abby.jpg"
import evan from "../../images/team/evan.png"
import kanika from "../../images/team/kanika.jpeg"
import aayushi from "../../images/team/aayushi.jpeg"
import harman from "../../images/team/harman.jpeg"
import abdul from "../../images/team/abdul.jpeg"
import shweta from "../../images/team/shweta.jpg"
import sam from "../../images/team/sam.jpeg"
import saurabha from  "../../images/team/saurabha.jpeg"
import neha from  "../../images/team/neha.jpeg"
import pierre from  "../../images/team/pierre.jpg"
import priyanka from  "../../images/team/priyanka.png"
import vishal from  "../../images/team/vishal.jpeg"
import theodore from  "../../images/team/theodore.jpeg"
import wanjia from "../../images/team/wanjia.jpeg"
/**
 * AboutInfo is handling the html code for the About section. 
 * The about section is composed of three sections: 
 * 1) General Overview of ClimateTree
 * 2) History of ClimateTree 
 * 3) Project vision (from Greg Schundler, project lead) 
 */

export default function AboutInfo() {
  return (
    <section id="about">
      <h1>About</h1>
      <p>
        Myriad climate change solution stories are bubbling up around the world - from people just like you, in places just like yours. They are found at research universities and schools, in cultural traditions and new technologies, on the front page of local newspapers, and in viral videos - from the center city to the remote countryside.
      </p>

      <p>
        ClimateTree is an innovative project that empowers communities of all scales and types to find, share, and discuss climate change solutions using the latest in Geographic Information Systems (GIS), web-platform, and social media technologies.
      </p>
      <p>
        Spin the globe and explore what’s happening anywhere, find stories by climate change mitigation or adaptation solution, search for comparables of your place, upload and tag content, comment on what you see, or meet a new friend across the world!
      </p>
      <h2>ClimateTree Story</h2>
      <p>
        ClimateTree was launched in 2020 by Northeastern University Master’s students in Advanced Software Development. Their Professor, Dr. Ian Gorton, Chair of Computer Science, found the project through the “tech for good” organization DemocracyLab.org founded by Mark Frischmuth.
      </p>
      <p>
        ClimateTree was conceived in 2019 by Greg Schundler and Abby Ruskey in response to global-scale ecological crisis, global climate strikes, and the inertia of international climate politics. The first research was done with high school students in Olympia, Washington, who, having helped demand and pass a City-wide climate change resolution, were asked to advise their city government on the adoption of appropriate climate change mitigation and adaptation solutions.
      </p>
      <p>
        Please send us a note at{" "}
        <a href="mailto:climatetreecontact@gmail.com">climatetreecontact@gmail.com</a>
      </p>
      <h2>A Reflection from Space</h2>
      <p>
        ClimateTree was inspired by a desire to help Earthlings live in harmony. You humans have always pondered ways to flourish and improve, while reducing suffering and avoiding disaster. Innovation, violence, and migration have been rotating solutions to your limits and problems. Yet, modern global-scale threats such as nuclear annihilation and ecological collapse have made conflict and migration increasingly untenable. Here you are. The time is now.
      </p>
      <p>
        Some of humanity’s brightest minds have contemplated a planetary migration and began searching for Plan-et B in the sky centuries ago - in recent decades with the NASA Keppler mission. Whether searching for planets like yours or researching what it would take to seed a barren planet in your own star system (you call it Mars), you have developed a deep scientific understanding of the very special parameters, and their relationships, that make life, and humanity’s flourishing, possible on Earth: solar energy, water, geothermal heat, and the presence of special elements, to name a few. This has been termed the Goldilocks effect – Earth seems to be just right.
      </p>
      <p>
        Yet most of you cannot affect planetary political or economic processes. You live in houses and apartments, villages and cities, in watersheds of the water planet, within political administrative units like counties, states, and nations, connected by urban extents and through global trade. And while you are diverse genetically, culturally, and spiritually – you are all human. You share your planet with other Earthlings - plants, fungi, animals, protists, and bacteria - all sentient creatures that help sustain you and each other.
      </p>
      <p>
        Humans have produced and shared an incredible legacy of data, knowledge, and opinion about what it means to be human and how to flourish as such. There are reams of perspectives on the optimal parameters to produce happiness, comfort, wealth, harmony, sustainability, freedom, peace, security, equality, success, and other human ideals. These parameters describe relationships between self, others, and nature at, and across, many spatio- temporal scales.
      </p>
      <p>
        GIS technology, Big Data, the Internet, social media, and global travel have given you all, at once, an ability to search your own planet for people just like you and places just like yours. So while the telescopes and satellites keep searching out there, you have the ability to search around here, and within yourselves, to learn from people and places just like you.
      </p>
      <p>
        ClimateTree gives any Earthling the ability to adjust Goldilocks parameters at any scale to find a village, city, county, state, or nation just like theirs. With a lead, you might just find a story, a civilization, a community, an individual that has a solution to a problem you have now. How did they do it?
      </p>
      <p>
        No human seems to be able to believe in a solution without first seeing - or believing - that it is possible. If you ever find a planet like yours or a way to make Mars green, you know that most of you would not board a spaceship flying there without some assurances that you would survive. And so it on Earth and in your lives.
      </p>
      <p>
        Such an inquisitive, practical, and cautious species will likely have a few more questions along the way. How much does it cost? What resources will we need? How long will it take? Are we there yet?
      </p>
      <p>
        ClimateTree creates the tools for your planet’s inhabitants to dive deep into discussion and collaborative research, sharing the data and stories that describe the practical and plausible paths to a better way of life, across all parameters and at all scales.
      </p>
      <p>
        Forget the pie in the sky - what are your favorite recipes here on Earth?
      </p>
      <cite>- Greg Schundler 2019</cite>

      <div class="wrapper">

        <h1>Our Team</h1>
        <div class="our_team">
          <div class="team_member">
            <div class="member_img">
               <img src={greg} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/gregschundler/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Greg <br></br> Schundler</h3>
            <span>Founder</span>
            
          </div> 

          <div class="team_member">
            <div class="member_img">
               <img src={abby} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/abbyruskey/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Abby <br></br> Ruskey</h3>
            <span>Founder</span>
            
          </div> 



          <div class="team_member">
            <div class="member_img">
               <img src={aayushi} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/aayushimaheshwari/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Aayushi Maheshwari </h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={abdul} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/abdul-kadir-olia-3a898712b/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Abdul  <br></br> Kadir Olia</h3>
            <span>Developer</span>
          </div>



          <div class="team_member">
            <div class="member_img">
               <img src={evan} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/evandouglass/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Evan  <br></br> Douglass</h3>
            <span>Developer</span>
          </div> 


          <div class="team_member">
            <div class="member_img">
               <img src={harman} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/harmanpreets1ngh/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Harman  <br></br> Preet</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={kanika} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/kanika-rana-34a95859/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Kanika  <br></br> Rana</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={neha} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/neha-gundecha/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Neha  <br></br> Gundecha</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={pierre} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/pierrealexandremousset/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Pierre-Alexandre Mousset</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={priyanka} alt="our_team"/>
              <div class="social_media">
               <a href="www.linkedin.com/in/priyanka-debnath-96311171" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Priyanka Debnath</h3>
            <span>Developer</span>
          </div>


          <div class="team_member">
            <div class="member_img">
               <img src={saurabha} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/saurabha-jirgi/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Saurabha  <br></br> Jirgi</h3>
            <span>Developer</span>
          </div>


          <div class="team_member">
            <div class="member_img">
               <img src={shweta} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/shweta-mandavgane/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Shweta Mandavgane</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={sam} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/siddhant-varyambat-232596106/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Siddhant Varyambat</h3>
            <span>Developer</span>
          </div>

          <div class="team_member">
            <div class="member_img">
               <img src={theodore} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/theodore-andrew/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Theodore Andrew</h3>
            <span>Developer</span>
          </div>


          <div class="team_member">
            <div class="member_img">
               <img src={vishal} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/vishal-patel-66082b159" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Vishal  <br></br> Patel</h3>
            <span>Developer</span>
          </div>


          <div class="team_member">
            <div class="member_img">
               <img src={wanjia} alt="our_team"/>
              <div class="social_media">
               <a href="https://www.linkedin.com/in/wanjia-tang-b97378117/" target="_blank"><i class="linkedin fab fa-linkedin"></i></a>
               </div>
            </div>
            <h3>Wanjia  <br></br> Tang</h3>
            <span>Developer</span>
          </div>

        </div>
    </div>
    </section>
  );
}