(function () {

  'use strict';

  angular.module('slamOff').value('TrackModel', TrackModel);

  function TrackModel(opts) {
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

  TrackModel.prototype.addVote = function () {
    this.votes += 1;
  }

})();
