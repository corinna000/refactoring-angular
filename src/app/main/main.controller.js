(function () {
  'use strict';

  angular
    .module('slamOff')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, trackSearch, bracketManager) {
    var vm = this;
    vm.searchForPoetry = searchForPoetry;
    vm.bm = bracketManager;

    //controls
    vm.startSlamOff = startSlamOff;

    /**
     * Initializes the brackets with the selected tracks
     */
    function startSlamOff() {
      bracketManager.initialize(vm.selectedTracks);
      clearSearchResults();
    }

    /**
     * Search SoundCloud for tracks to add to the poetry bracket
     */
    function searchForPoetry() {
      trackSearch.search(vm.poetrySearchTerm).then(function (tracks) {
        vm.searchResults = tracks;
      });
    }

    /**
     * Clears the search results
     */
    function clearSearchResults() {
      vm.searchResults = [];
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
