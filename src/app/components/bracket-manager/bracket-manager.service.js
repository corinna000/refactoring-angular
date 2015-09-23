(function () {
  'use strict';

  angular.module('slamOff').factory('bracketManager', bracketManager);

  function bracketManager() {

    var tracks = [];
    var winners = [];

    var service = {
      initialize: initialize,
      vote: vote,
      getWinner: getWinner,
      showCurrentRound: showCurrentRound
    };

    Object.defineProperty(service, 'tracks', {
      get: function () {
        return tracks;
      }
    });

    return service;

    function initialize(tracksArr) {
      tracks = randomizeTracks(angular.copy(tracksArr));
    }

    function vote(round, track) {
      track.addVote();
      winners[round] = track;
    }

    function getWinner(round) {
      return winners[round];
    }

    function showCurrentRound(roundNum) {
      // rounds 0-3, show if future rounds are not filled
      switch (roundNum) {
        case 0:
          return !angular.isDefined(winners[0]);
          break;
        case 1:
          return !angular.isDefined(winners[1]);
          break;
        case 2:
          return !angular.isDefined(winners[2]);
          break;
        case 3:
          return !angular.isDefined(winners[3]);
          break;
        case 4:
          // display if previous two but not final
          return (
            angular.isDefined(winners[0])
            && angular.isDefined(winners[1])
            && (!angular.isDefined(winners[4]))
          );
          break;
        case 5:
          return (
            angular.isDefined(winners[2])
            && angular.isDefined(winners[3])
            && ! angular.isDefined(winners[5])
          );
          break;
        case 6:
          return (
            angular.isDefined(winners[4])
            && angular.isDefined(winners[5])
            && ! angular.isDefined(winners[6])
          );
      }
    }

    function randomizeTracks(tracks) {
      var randomIndex, randomizedTracks = [];
      while (tracks.length) {
        randomIndex = Math.floor(Math.random() * tracks.length);
        randomizedTracks.push(tracks.splice(randomIndex, 1)[0]);
      }
      return randomizedTracks;
    }
  }

})();
