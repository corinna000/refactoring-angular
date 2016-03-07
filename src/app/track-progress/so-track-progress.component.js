(function () {

  'use strict';

  angular.module('slamOff').component('soTrackProgress', {
    template: '<div><div>position: {{ $ctrl.position | date:\'mm:ss\' }}</div><div>duration: {{ $ctrl.duration | date:\'mm:ss\' }}</div><div class="progress"><div class="progress-bar" ng-style="$ctrl.style"></div></div></div>',

    controller: function ($interval, trackPlayer) {
      var self = this;
      self.position = 0;
      self.duration = 0;
      self.percentComplete = 0;

      activate();

      function activate() {
        setWidth(self.percentComplete);
      }

      function setWidth(percent) {
        var widthPercent = (isNaN(percent)) ? 0 : percent;
        self.style = {width: widthPercent + '%'};
      }

      function update() {
        self.position = trackPlayer.getPosition();
        self.duration = trackPlayer.getDuration();
        self.percentComplete = parseFloat(self.position / self.duration * 100).toFixed(2);
      }

      $interval(function () {
        update();
        setWidth(self.percentComplete);
      }, 100);

    }

  });

})();
