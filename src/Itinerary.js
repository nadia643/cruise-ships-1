/* globals window */
(function exportItinerary() {
  function Itinerary(ports) {
    this.ports = ports;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Itinerary;
  } else {
    window.Itinerary = Itinerary;
  }
}());
