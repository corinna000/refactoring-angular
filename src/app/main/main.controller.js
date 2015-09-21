(function () {
  'use strict';

  angular
    .module('slamOff')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    var vm = this;

    vm.tracks = [];
    vm.model = {};
    vm.searchForPoetry = searchForPoetry;
    vm.previousRoundsComplete = previousRoundsComplete;

    //controls
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

    /**
     * Initializes the brackets with the selected tracks
     */
    function startSlamOff() {
      vm.tracks = randomizeTracks(angular.copy(vm.selectedTracks));
      saveBracket(vm.tracks);
      clearSearchResults();
    }

    /**
     * Search SoundCloud for tracks to add to the poetry bracket
     */
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

    /**
     * Clears the search results
     */
    function clearSearchResults() {
      vm.searchResults = [];
    }

    /**
     * Randomizes a set of SoundCloud tracks
     * @param tracks
     * @returns {Array.<T>}
     */
    function randomizeTracks(tracks) {
      var randomizedTracks = [];
      while (tracks.length) {
        var randomIndex = Math.floor(Math.random() * tracks.length);
        randomizedTracks.push(tracks.splice(randomIndex, 1)[0]);
      }
      return randomizedTracks;
    }

    /**************************************************************
     * BRACKET OPERATIONS
     *************************************************************/

    /**
     * Returns the track from the set of winners matching the given index
     * @param index
     * @returns {*|T}
     */
    function getWinner(index) {
      return vm.tracks[vm.winners[index]];
    }

    /**
     * Saves the brackets
     * @returns {{}}
     */
    function loadBrackets() {
      var savedBrackets = JSON.parse(localStorage.getItem('brackets'));
      return savedBrackets || {};
    }

    /**
     * Saves the brackets back to Storage
     * @param tracks
     */
    function saveBracket(tracks) {
      var savedBrackets = loadBrackets();
      if (vm.model.poetrySearch) {
        savedBrackets[vm.model.poetrySearch] = tracks;
        localStorage.setItem('brackets', JSON.stringify(savedBrackets));
      }
    }

    /**
     * Returns true if the previous set of winners has completed
     * @param round
     * @returns {boolean|*}
     */
    function previousRoundsComplete (round) {
      var idx1 = 0, idx2 = 1;
      if (round) {
        idx1 += 2*round;
        idx2 += 2*round;
      }
      return (angular.isDefined(vm.winners[idx1]) && angular.isDefined(vm.winners[idx2]));
    }

    /**
     * Votes for a track and records the track number for the given round
     * @param round
     * @param trackIdx
     */
    function vote(round, trackIdx) {
      stopTrack();
      if (!vm.tracks[trackIdx].votes) {
        vm.tracks[trackIdx].votes = 1;
      } else {
        vm.tracks[trackIdx].votes += 1;
      }
      vm.winners[round] = trackIdx;
    }

    $scope.$watch('vm.searchResults', function (updatedList) {
      if (angular.isArray(updatedList)) {
        vm.selectedTracks = updatedList.filter(function (track) {
          return track.selected;
        });
      }
    }, true);

  }
})();
