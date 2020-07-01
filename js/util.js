'use strict';

(function () {
  var random = function (wizardProperty) {
    return wizardProperty[Math.floor(Math.random() * wizardProperty.length)];
  };

  var shufle = function (array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    // Пока есть элементы для перетасовки...
    while (currentIndex !== 0) {

      // Выбрать оставшийся элемент...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // И поменять его местами с текущим элементом.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  window.util = {
    random: random,
    shufle: shufle
  };

})();
