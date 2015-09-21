(function () {

  'use strict';

  angular.module('slamOff').directive('trackPlayerProgress', trackPlayerProgress);

  var template = [
    '<div><div>position: {{ position | date:\'mm:ss\' }}</div><div>duration: {{ duration | date:\'mm:ss\' }}</div><div class="progress"><div class="progress-bar" ng-style="style"></div></div></div>'
  ].join();

  function trackPlayerProgress(trackPlayer, $interval) {
    return {
      restrict: 'E',
      template: template,
      link: function (scope) {

        scope.position = 0;
        scope.duration = 0;
        scope.percentComplete = 0;

        activate();

        function activate() {
          setWidth(scope.percentComplete);
        }

        function setWidth(percent) {
          var widthPercent = (isNaN(percent)) ? 0 : percent;
          scope.style = {width: widthPercent + '%'};
        }

        function update() {
          scope.position = trackPlayer.getPosition();
          scope.duration = trackPlayer.getDuration();
          scope.percentComplete = parseFloat(scope.position / scope.duration * 100).toFixed(2);
        }

        $interval(function () {
          update();
          setWidth(scope.percentComplete);
        }, 100);

      }
    }
  }

})();
