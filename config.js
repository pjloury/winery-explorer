/* Public, browser-visible configuration — safe to commit.
   googleMapsApiKey: a browser key restricted by HTTP referrer in Google Cloud Console
   (APIs & Services → Credentials). Powers real drive-time estimates in the Itinerary tab
   via the Maps JavaScript API's DistanceMatrixService. Leave empty to use the built-in
   straight-line drive-time estimate instead — the itinerary builder works either way. */
window.APP_CONFIG = {
  googleMapsApiKey: "",
};
