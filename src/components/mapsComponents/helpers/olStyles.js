import { Fill, Stroke, Circle, Style, Text } from 'ol/style';

/* Styles */
const singleFeatureSize = 8;

// Allows for dynamic style choice based on type and cluster size
let styleCache = {};
const primaryStyle = feature => {
    // below may be useful if incorporating polygons
    //const featureType = feature.getGeometry().getType();

    const numInCluster = feature.get('features').length;
    let style;
    // Check if there is already a style available
    // If not, create a new one and cache it
    if (!(numInCluster in styleCache)) {
        // Determine a radius size
        let radius;
        let clusterBaseSize = 7;
        let test = numInCluster / 10;
        if (numInCluster === 1) {        // single feature point
            radius = singleFeatureSize;
        } else if (test < 1) {          // number is < 10
            radius = clusterBaseSize * 2;
        } else if (test < 10) {         // number is < 100
            radius = clusterBaseSize * 3;
        } else {                        // number is >= 100
            radius = clusterBaseSize * 4;
        }

        // Create basic Point style
        const image = new Circle({
            radius: radius,
            fill: new Fill({ color: 'rgba(255, 255, 255, 0.75)' }),
            stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.5)', width: 0.5 }),
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

const targetStyle = feature => {
    return new Style({
        image: new Circle({
            radius: singleFeatureSize,
            // If this is changed, it should also be changed in StoryDashboard.css
            fill: new Fill({ color: 'rgb(66, 173, 16)' }),
            stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.5)', width: 0.5 }),
        }),
    });
}

export { primaryStyle, targetStyle };