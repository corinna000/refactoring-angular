var SC = SC || {};
(function (SC) {

  /**
   * Separate Soundcloud into its own module and include it
   * into the main project module.
   */
  angular.module('soundcloud', []);

  /**
   * Provide a wrapper around Soundcloud. This will
   * make it easier for us to do unit testing.
   */
  angular.module('soundcloud').value('soundcloud', SC);

})(SC);
