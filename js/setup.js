'use strict';

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

var random = function (wizardProperty) {
  return wizardProperty[Math.floor(Math.random() * wizardProperty.length)];
};
var generateRandomWizard = function () {
  var wizards = [];
  for (var i = 0; i < COUNT_WIZARDS; i++) {
    wizards.push({
      name: random(WIZARD_NAMES) + ' ' + random(WIZARD_SURNAMES),
      coatColor: random(COAT_COLORS),
      eyesColor: random(EYES_COLORS)
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
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

init();

// ------------------ Открытие/закрытие окна настройки персонажа ------------------

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// ------------------ Валидация ввода имени персонажа ------------------

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// ------------------ Изменение цвета персонажа по нажатию ------------------

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
  var coatColor = random(WIZARD_COAT_COLOR);
  wizardCoat.style.fill = coatColor;
  playerCoat.value = coatColor;
});

wizardEyes.addEventListener('click', function () {
  var eyesColor = random(WIZARD_EYES_COLOR);
  wizardEyes.style.fill = eyesColor;
  playerEyes.value = eyesColor;
});

wizardFireball.addEventListener('click', function () {
  var fireballColor = random(FIREBALL_COLOR);
  wizardFireball.style.backgroundColor = fireballColor;
  playerFireball.value = fireballColor;
});
