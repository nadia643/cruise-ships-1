(function exportItinerary() {
  function Itinerary(port) {
    this.ports = port;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Itinerary;
  } else {
    window.Itinerary = Itinerary;
  }
}());
