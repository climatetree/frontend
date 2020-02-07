import { Fill, Stroke, Circle, Style, Text } from 'ol/style';

/* Styles */

// Allows for dynamic style choice based on type and cluster size
let styleCache = {};
const styleFunction = (feature) => {
    // below may be useful if incorporating polygons
    //const featureType = feature.getGeometry().getType();

    const numInCluster = feature.get('features').length;
    let style;
    // Check if there is already a style available
    // If not, create a new one and cache it
    if (!(numInCluster in styleCache)) {
        // Determine a radius size
        let radius;
        let baseVal = 6;
        let test = numInCluster / 10;
        if (numInCluster === 1) {        // single feature point
            radius = baseVal;
        } else if (test < 1) {          // number is < 10
            radius = baseVal * 2;
        } else if (test < 10) {         // number is < 100
            radius = baseVal * 3;
        } else {                        // number is >= 100
            radius = baseVal * 4;
        }

        // Create basic Point style
        const image = new Circle({
            radius: radius,
            fill: new Fill({ color: 'rgba(255, 255, 255, 0.75)' }),
            stroke: new Stroke({ color: 'black', width: 1.25 }),
        });

        // Create Cluster style
        style = new Style({
            image: image,
            text: new Text({
                // If there is more than one feature, display num features in cluster
                text: numInCluster > 1 ? numInCluster.toString() : "",
                fill: new Fill({
                    color: 'black',
                }),
            }),
        });
        styleCache[numInCluster] = style;
    }
    style = styleCache[numInCluster];
    return style;
}

export default styleFunction;