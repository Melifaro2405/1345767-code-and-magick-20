'use strict';

// ------------------ Настройка персонажа ------------------

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // var random = function (wizardProperty) {
  //   return wizardProperty[Math.floor(Math.random() * wizardProperty.length)];
  // };

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupWizard.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var playerCoat = document.querySelector('input[name="coat-color"]');
  var playerEyes = document.querySelector('input[name="eyes-color"]');
  var playerFireball = document.querySelector('input[name="fireball-color"]');

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.randomize(WIZARD_COAT_COLOR);
    wizardCoat.style.fill = coatColor;
    playerCoat.value = coatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var eyesColor = window.randomize(WIZARD_EYES_COLOR);
    wizardEyes.style.fill = eyesColor;
    playerEyes.value = eyesColor;
  });

  wizardFireball.addEventListener('click', function () {
    var fireballColor = window.randomize(FIREBALL_COLOR);
    wizardFireball.style.backgroundColor = fireballColor;
    playerFireball.value = fireballColor;
  });

  // ------------------ Создаем похожих персонажей в окне настройки ------------------

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COUNT_WIZARDS = 4;

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateRandomWizard = function () {
    var wizards = [];
    for (var i = 0; i < COUNT_WIZARDS; i++) {
      wizards.push({
        name: window.randomize(WIZARD_NAMES) + ' ' + window.randomize(WIZARD_SURNAMES),
        coatColor: window.randomize(COAT_COLORS),
        eyesColor: window.randomize(EYES_COLORS)
      });
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var drewWizards = function () {
    var wizards = generateRandomWizard();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var init = function () {
    drewWizards();
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  init();
})();
