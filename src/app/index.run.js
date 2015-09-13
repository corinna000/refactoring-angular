(function() {
  'use strict';

  angular
    .module('slamOff')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
