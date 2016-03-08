(function () {
  'use strict';

  angular
    .module('slamOff')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, bracketManager, trackPlayer) {
    var vm = this;

    vm.bm = bracketManager;
    vm.startSlamOff = startSlamOff;
    vm.updateTracks = updateTracks;

    /**
     * Initializes the brackets with the selected tracks
     */
    function startSlamOff() {
      bracketManager.initialize(vm.selectedTracks);
      clearSearchResults();
    }

    function updateTracks(tracks) {
      vm.searchResults = tracks;
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
