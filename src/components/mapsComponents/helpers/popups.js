import Overlay from 'ol/Overlay';

const createPopupOverlay = () => {
    let closer = document.getElementById('popup-closer');

    // Create an overlay to anchor popups to the map.
    let overlay = new Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = () => {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    return overlay;
}

export { createPopupOverlay };