'use strict';

// ------------------ Настройка персонажа ------------------

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };


  var init = function () {
    window.backend.load(function (allWizards) {
      var wizards = shufle(allWizards).slice(0, MAX_SIMILAR_WIZARD_COUNT);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < wizards.length; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      userDialog.querySelector('.setup-similar').classList.remove('hidden');
    });
  };

  init();

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
