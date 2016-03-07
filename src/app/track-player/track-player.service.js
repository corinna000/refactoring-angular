(function () {

  angular.module('slamOff').factory('trackPlayer', trackPlayer);

  function trackPlayer(soundcloud, $interval) {
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
    var currentTrack;
    var currentDuration;
    var currentPosition;
    var playingInterval;

    var service = {
      play: play,
      stop: stop,
      getDuration: getDuration,
      getPosition: getPosition
    };

    return service;

    function play(track) {
      stop();
      soundcloud.stream('/tracks/' + track.id, function (sound) {
        currentTrack = sound;

        sound.play();
        playingInterval = $interval(function () {
          currentDuration = sound.getDuration();
          currentPosition = sound.getCurrentPosition();
        }, 100);
      });
    }

    function stop() {
      if (currentTrack) {
        currentTrack.stop();
      }
    }

    function getDuration() {
      return currentDuration;
    }

    function getPosition() {
      return currentPosition;
    }
  }
})();
