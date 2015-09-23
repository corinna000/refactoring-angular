(function () {
  'use strict';

  angular.module('slamOff').directive('soVotingTrack', soVotingTrack);

  function soVotingTrack () {
    return {
      templateUrl: 'app/components/voting-track/so-voting-track.html',
      scope: {
        track: '='
      },
      controller: function ($scope, $attrs, trackPlayer, bracketManager) {
        $scope.play = play;
        $scope.stop = stop;
        $scope.vote = vote;

        function play(track) {
          stop();
          trackPlayer.play(track);
        }

        function stop() {
          trackPlayer.stop();
        }

        function vote () {
          stop();
          bracketManager.vote($attrs.round, $scope.track);
        }
      }
    };
  }

})();
