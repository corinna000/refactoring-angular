(function () {
  'use strict';

  angular.module('slamOff').directive('soVotingTrack', soVotingTrack);

  function soVotingTrack () {
    return {
      templateUrl: 'app/components/voting-track/so-voting-track.html',
      scope: {
        track: '='
      },
      controller: function ($scope, trackPlayer) {
        $scope.play = play;
        $scope.stop = stop;

        function play(track) {
          trackPlayer.stop();
          trackPlayer.play(track);
        }

        function stop() {
          trackPlayer.stop();
        }
      }
    };
  }

})();
