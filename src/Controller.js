/* eslint-env browser */
(function exportController() {
  function Controller() {
    this.initialiseSea();
  }

  Controller.prototype = {
    initialiseSea() {
      const backgrounds = [
        './images/water0.png',
        './images/water1.png',
      ];

      let backgroundIndex = 0;

      setInterval(() => {
        const viewport = document.querySelector('#viewport');
        viewport.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;

        backgroundIndex += 1;
        if (backgroundIndex === backgrounds.length) {
          backgroundIndex = 0;
        }
      }, 1000);
    },
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
