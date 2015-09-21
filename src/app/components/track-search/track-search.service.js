(function () {
  'use strict';

  angular.module('slamOff').factory('trackSearch', trackSearch);

  var default_opts = {
    genres: 'poetry',
    limit: 16,
    streamable: true,
    duration: {
      from: 0,
      to: 1000 * 60 * 3 // three minutes
    }
  };

  function trackSearch(soundcloud, $q, $rootScope) {

    var service = {
      search: search
    };

    return service;

    function search(term) {
      var opts = angular.copy(default_opts);
      opts.q = term;

      return $q(function (resolve) {
        soundcloud.get('/tracks', opts, function (tracks) {
          resolve(tracks);
        });
      });
    }

  }

})();
