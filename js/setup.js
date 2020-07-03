'use strict';

// ------------------ Настройка персонажа ------------------

(function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var WIZARD_COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizards = [];

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupWizard.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var playerCoat = document.querySelector('input[name="coat-color"]');
  var playerEyes = document.querySelector('input[name="eyes-color"]');
  var playerFireball = document.querySelector('input[name="fireball-color"]');
  var userDialog = document.querySelector('.setup');

  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }).slice(0, MAX_SIMILAR_WIZARD_COUNT));
  };

  var updateWizardsDebounce = window.debounce(updateWizards);

  wizardCoat.addEventListener('click', function () {
    var newColor = window.util.random(WIZARD_COAT_COLOR);
    wizardCoat.style.fill = newColor;
    playerCoat.value = newColor;
    coatColor = newColor;
    updateWizardsDebounce();
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = window.util.random(WIZARD_EYES_COLOR);
    wizardEyes.style.fill = newColor;
    playerEyes.value = newColor;
    eyesColor = newColor;
    updateWizardsDebounce();
  });

  wizardFireball.addEventListener('click', function () {
    var fireballColor = window.util.random(FIREBALL_COLOR);
    wizardFireball.style.backgroundColor = fireballColor;
    playerFireball.value = fireballColor;
  });

  window.backend.load(function (allWizards) {
    wizards = allWizards;
    var randomWizards = window.util.shufle(allWizards).slice(0, MAX_SIMILAR_WIZARD_COUNT);
    window.render.renderWizards(randomWizards);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  });
})();
