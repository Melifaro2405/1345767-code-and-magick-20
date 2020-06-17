'use strict';

(function () {
  var random = function (wizardProperty) {
    return wizardProperty[Math.floor(Math.random() * wizardProperty.length)];
  };
  window.randomize = random;
})();
