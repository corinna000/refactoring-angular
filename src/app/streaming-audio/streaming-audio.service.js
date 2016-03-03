(function () {
  'use strict';

  angular.module('slamOff').factory('StreamingAudio', StreamingAudio);

  function StreamingAudio($q, soundcloud) {
    var service = {
      search: search
    };

    return service;

    function search(options, term) {
      options = options || {};
      options.q = term;
      return $q(function (resolve) {
        soundcloud.get('/tracks', options, function (results) {
          resolve(results);
        });
      })
    }

  }

})();
