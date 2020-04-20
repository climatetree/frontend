import React from "react";

import "./Acknowledgement.css";

const Acknowledgement = () => {
  return (
    <div className="about-section-container">
      <h2>Acknowledgements</h2>
      <hr className="about-hr"></hr>
      <p className="about-paragraph">
        In addition to NEU student website developers and Dr. Gorton, we would
        like to thank the following:
        <ul className="acknowledgement">
          <li>
            The students, educators and community members and leaders in
            Olympia, Washington; Toronto, Ontario; and the Hudson River Valley,
            New York who “test drove” the ClimateTree initial tools and concept.
          </li>
          <li>
            <a target="_blank" href="https://drawdown.org/">
              Project Drawdown
            </a>{" "}
            and the <a>International Panel on Climate Change</a> the world’s
            most comprehensive, rigorously and scientifically researched
            solution sets used for this site.
          </li>
          <li>
            Many colleagues, organizations and friends who encouraged and
            contributed, including those who inspired our thinking about{" "}
            <a target="_blank" href="https://eartharxiv.org/feaq5/">
              “magnitudes of scale”
            </a>
            .
          </li>
          <li>
            The organizations that provided the datasets to make the map
            including:{" "}
            <a target="_blank" href="https://gadm.org/">
              GADM.org
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://sedac.ciesin.columbia.edu/data/set/grump-v1-urban-ext-polygons-rev01"
            >
              NASA SEDAC
            </a>
            ,{" "}
            <a target="_blank" href="http://ffdas.rc.nau.edu/About.html">
              FFDAS
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://geospatial.tnc.org/datasets/7b7fb9d945544d41b3e7a91494c42930_0"
            >
              The Nature Conservancy
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              href="https://www.esri.com/en-us/arcgis/products/data-location-services/data/basemaps-imagery"
            >
              ESRI
            </a>
          </li>
          <li>
            WSU Extension Mason County, Thurston County and the City of Portland
            for letting Greg explore applications of “comparable communities”
            across dimensions of property taxes, land use, infrastructure
            budgeting, government performance and more
          </li>
          <li>
            Those new friends and partners to come - please{" "}
            <a href="mailto:climatetreecontact@gmail.com">contact us!</a>
          </li>
        </ul>
      </p>
    </div>
  );
};

export default Acknowledgement;
