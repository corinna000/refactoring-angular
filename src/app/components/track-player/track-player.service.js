(function () {

  angular.module('slamOff').factory('trackPlayer', trackPlayer);

  function trackPlayer() {
    /*
    function playTrack(track) {
      // stop any other track playing
      stopTrack();
      SC.stream('/tracks/' + track.id, function (sound) {
        vm.currentlyPlayingTrack = sound;
        sound.play();
        vm.currentInterval = $interval(function () {
          vm.duration = sound.getDuration();
          vm.position = sound.getCurrentPosition();
        }, 100);
      });
    }
    */
    var service = {
      play: play,
      stop: stop
    };

    return service;

    function play () {}
    function stop () {}
  }
})();
