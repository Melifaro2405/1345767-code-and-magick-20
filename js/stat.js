'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 30;
  var PREVIEW_GAP = 20;
  var BAR_HEIGHT = 130;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    var cloudxWithBarGup = CLOUD_X + BAR_GAP;
    var cloudyWithCloudHeight = CLOUD_Y + CLOUD_HEIGHT;
    var maxTime = getMaxElement(times);

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + PREVIEW_GAP, 40);
    ctx.fillText('Список результатов:', CLOUD_X + PREVIEW_GAP, 60);

    for (var i = 0; i < players.length; i++) {
      var barWidthWithBarGup = (BAR_WIDTH + BAR_GAP) * i;
      var randomSaturation = Math.floor(Math.random() * 100) + '%';
      var timesHeight = -(BAR_HEIGHT * times[i]) / maxTime;

      ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + randomSaturation + ', 50%)';
      ctx.fillRect(cloudxWithBarGup + barWidthWithBarGup, cloudyWithCloudHeight - BAR_GAP, BAR_WIDTH, timesHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(players[i], cloudxWithBarGup + barWidthWithBarGup, cloudyWithCloudHeight - FONT_GAP);
      ctx.fillText(Math.round(times[i]), cloudxWithBarGup + barWidthWithBarGup, BAR_HEIGHT + timesHeight + BAR_GAP + (CLOUD_Y + GAP) * 2);
    }
  };
})();
