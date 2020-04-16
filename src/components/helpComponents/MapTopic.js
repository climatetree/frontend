import React from "react";

const MapTopic = () => {
  return (
    <div className="help-topic">
      <h1 className="big-title">Map</h1>
      <div className="help-header">
        <p className="objective">
          “How are people solving Climate Change where you live, and how are
          they solving it in places just like yours?”
        </p>
      </div>
      <div className="help-body">
        <div className="help-content-paragraph">
          <h2 className="help-title">Places On The Map</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            ClimateTree has gathered many geographic units at many scales: the
            Nations of the world along with their “States”, “Counties”, and
            “Urban Extents”
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">200 Nations</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            These are the countries of the world, there are about 200 on the
            planet
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">4,000 States</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Every country divides itself into smaller areas. In the United
            States we call them “States”; in Canada, “Provinces”; in Germany,
            “Bundeslander”; and in Japan, “Prefectures”. With all the different
            nations and languages, geographers call them “subnational
            administrative units of the first order”
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">40,000 Counties</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Just as Nations divide into States, most nations divide their States
            further”. With all the different nations and languages, geographers
            call them “subnational administrative units of the second order”.
            Use this for your map search if you live in a small village or city.
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">50,000 Urban Extents</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            These are the major cities of the world and the area of their
            regional influence. New York City and Tokyo encompass tens of
            millions of people. These units are good for researching urban
            regional issues. If you live in a small city, try counties instead.
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">Sources</h2>
          <hr className="help-hr"></hr>
          <ul className="list-videos-link">
            <li className="bullet-point">
              Nations, States, and Counties -
              <a
                className="video-link"
                href="https://gadm.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GADM.org
              </a>
            </li>
            <li className="bullet-point">
              Urban Extents -
              <a
                className="video-link bullet-point"
                href="https://sedac.ciesin.columbia.edu/data/set/grump-v1-urban-ext-polygons-rev01"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA SEDAC
              </a>
            </li>
            <li className="bullet-point">
              Population -
              <a
                className="video-link bullet-point"
                href="https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA SEDAC
              </a>
            </li>
            <li className="bullet-point">
              Ecoregions -
              <a
                className="video-link bullet-point"
                href="https://geospatial.tnc.org/datasets/7b7fb9d945544d41b3e7a91494c42930_0"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Nature Conservancy
              </a>
            </li>
            <li className="bullet-point">
              Basemaps -
              <a
                className="video-link bullet-point"
                href="https://www.esri.com/en-us/arcgis/products/data-location-services/data/basemaps-imagery"
                target="_blank"
                rel="noopener noreferrer"
              >
                ESRI
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapTopic;
