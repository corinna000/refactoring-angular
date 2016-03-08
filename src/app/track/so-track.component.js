(function () {
  'use strict';

  angular.module('slamOff').component('soTrack', {
    templateUrl: 'app/track/so-track-template.html',
    bindings: {
      track: '='
    },
    controller: function ($attrs, trackPlayer, bracketManager) {
      var self = this;
      self.play = play;
      self.stop = stop;
      self.vote = vote;

      function play(track) {
        stop();
        trackPlayer.play(track);
      }

      function stop() {
        trackPlayer.stop();
      }

      function vote () {
        stop();
        bracketManager.vote($attrs.round, self.track);
      }
    }

  });
})();
