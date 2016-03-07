(function () {
  'use strict';

  angular.module('slamOff').service('TrackFactory', TrackFactory);

  function TrackFactory () {
    var service = {
      create: create
    };

    return service;

    function create(json) {
      return new Track(json);
    }

  }

  function Track(opts) {
    if (angular.isObject(opts)) {
      for (var prop in opts) {
        if (opts.hasOwnProperty(prop)) {
          this[prop] = opts[prop];
        }
      }
    }

    // initialize the votes
    this.votes = 0;
  }

  Track.prototype.addVote = function () {
    this.votes += 1;
  };

})();
