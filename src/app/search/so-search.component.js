(function () {
  'use strict';

  var SEARCH_OPTIONS = {
    genres: 'poetry',
    limit: 16,
    streamable: true,
    duration: {
      from: 0,
      to: 1000 * 60 * 3 // three minutes
    }
  };

  angular.module('slamOff').component('soSearch', {
    template: [
      '<form class="form-inline" ng-submit="$ctrl.search(query)">',
      '<label for="so-search" ng-transclude></label>',
      '<div class="form-group">',
      '<input id="so-search" class="form-control" ng-model="query">',
      '<button type="submit" class="btn btn-primary">Search</button>',
      '</div>',
      '</form>'
    ].join(''),
    transclude: true,
    bindings: {
      onTracksUpdated: '<'
    },
    controller: function (StreamingAudio, TrackFactory) {
      var self = this;
      this.search = function (query) {
        StreamingAudio.search(angular.copy(SEARCH_OPTIONS), query).then(function (results) {
          var tracks = results.map(function (item) {
            return TrackFactory.create(item)
          });
          self.onTracksUpdated(tracks);
        });
      }
    }
  });

})();
