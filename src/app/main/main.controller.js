(function () {
  'use strict';

  angular
    .module('slamOff')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $interval) {
    var vm = this;

    vm.tracks = [];
    vm.model = {};
    vm.currentlyPlayingTrack = undefined;
    vm.searchForPoetry = searchForPoetry;
    vm.isDefined = angular.isDefined;
    vm.previousRoundsComplete = previousRoundsComplete;
    vm.showFinal = showFinal;

    //controls
    vm.playTrack = playTrack;
    vm.stopTrack = stopTrack;
    vm.startSlamOff = startSlamOff;
    vm.vote = vote;
    vm.saveBracket = saveBracket;
    vm.getWinner = getWinner;

    // scoring
    // winners (track number)
    // round one: 0-3
    // semi-final : 4-5
    // final: 6
    vm.winners = [];

    // sound attributes
    vm.position = undefined;
    vm.duration = undefined;
    vm.percentPlayed = 0; // calculated with watcher

    activate();

    function activate() {
    }

    function randomizeTracks(tracks) {
      var randomizedTracks = [];
      while (tracks.length) {
        var randomIndex = Math.floor(Math.random() * tracks.length);
        randomizedTracks.push(tracks.splice(randomIndex, 1)[0]);
      }
      return randomizedTracks.filter(function (track) {
        return (track.kind === 'track');
      });
    }

    function stopTrack() {
      if (vm.currentlyPlayingTrack) {
        vm.currentlyPlayingTrack.stop();
      }
      if (vm.currentInterval) {
        $interval.cancel(vm.currentInterval);
      }
    }
    function playTrack(track) {
      // stop any other track playing
      stopTrack();
      SC.stream('/tracks/' + track.id, function (sound) {
        vm.currentlyPlayingTrack = sound;
        sound.play();
        vm.currentInterval = $interval(function () {
          vm.duration = sound.getDuration();
          vm.position = sound.getCurrentPosition();
        }, 100);
      });
    }

    function searchForPoetry() {
      var options = {
        q: vm.model.poetrySearch,
        genres: 'poetry',
        limit: 16,
        streamable: true,
        duration: {
          from: 0,
          to: 1000 * 60 * 3 // three minutes
        }
      };

      SC.get('/tracks', options, function (tracks) {
        $scope.$apply(function () {
          vm.searchResults = tracks;
        });
      });

    }

    function getWinner(index) {
      return vm.tracks[vm.winners[index]];
    }

    function startSlamOff() {
      vm.tracks = randomizeTracks(angular.copy(vm.selectedTracks));
      saveBracket(vm.tracks);
      clearSearchResults();
    }

    function previousRoundsComplete (round) {
      var idx1 = 0, idx2 = 1;
      if (round) {
        idx1 += 2;
        idx2 += 2;
      }
      return (angular.isDefined(vm.winners[idx1]) && angular.isDefined(vm.winners[idx2]));
    }

    function showFinal() {

    }

    function loadBrackets() {
      var savedBrackets = JSON.parse(localStorage.getItem('brackets'));
      return savedBrackets || {};
    }

    function saveBracket(tracks) {
      var savedBrackets = loadBrackets();
      if (vm.model.poetrySearch) {
        savedBrackets[vm.model.poetrySearch] = tracks;
        localStorage.setItem('brackets', JSON.stringify(savedBrackets));
      }
    }

    function clearSearchResults() {
      vm.searchResults = [];
    }

    function vote(round, trackIdx) {
      stopTrack();
      if (!vm.tracks[trackIdx].votes) {
        vm.tracks[trackIdx].votes = 1;
      } else {
        vm.tracks[trackIdx].votes += 1;
      }
      vm.winners[round] = trackIdx;
    }

    // sets the width value for progress bar
    $scope.$watch('vm.position', function () {
      var percent = parseFloat(vm.position / vm.duration * 100).toFixed(0);
      vm.percentPlayed = {width: percent + '%'};
    });

    $scope.$watch('vm.searchResults', function (updatedList) {
      if (angular.isArray(updatedList)) {
        vm.selectedTracks = updatedList.filter(function (track) {
          return track.selected;
        });
      }
    }, true);

  }
})();
