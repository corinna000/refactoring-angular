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
      '<form ng-submit="$ctrl.search(query)">',
      '<input ng-model="query"><button type="submit">Search</button>',
      '</form>'
    ].join(''),
    bindings: {
      onTracksUpdated: '<'
    },
    controller: function (StreamingAudio) {
      var self = this;
      this.search = function (query) {
        StreamingAudio.search(angular.copy(SEARCH_OPTIONS), query).then(function (results) {
          self.onTracksUpdated(results);
        });
      }
    }
  });

})();
