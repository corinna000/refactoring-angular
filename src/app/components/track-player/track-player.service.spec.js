(function () {
  'use strict';

  describe('track player service', function () {

    var sut, $rootScope, soundcloudMock;

    // This loads our module for unit testing.
    beforeEach(module('slamOff', function ($provide) {

      soundcloudMock = {
        stream: jasmine.createSpy('stream').and.callFake(soundcloudStream),
        get: jasmine.createSpy('get').and.callFake(soundcloudGet)
      };

      $provide.value('soundcloud', soundcloudMock);
    }));

    // This injects services we want for testing (including
    // our system under test) and kicks off the bootstrapping
    // needed for Angular to run
    beforeEach(inject(function (trackPlayer, _$rootScope_) {
      sut = trackPlayer;
      $rootScope = _$rootScope_;
    }));

    describe('play', function () {

      var args, track;

      beforeEach(function () {
        track = {id: 100};
      });

      /**
       * We don't have direct access to the mechanics of
       * the soundcloud player, but we do supply a callback
       * function. This gives us a seam to insure that we're
       * implementing the API correctly.
       */
      it('plays a track', inject(function ($interval) {
        sut.play(track);

        args = soundcloudMock.stream.calls.argsFor(0);

        expect(soundcloudMock.stream).toHaveBeenCalled();
        expect(args[0]).toMatch(new RegExp(track.id));
        expect(playMock).toHaveBeenCalled();

        // We update the duration and position every 100ms
        $interval.flush(100);
        expect(durationMock).toHaveBeenCalled();
        expect(sut.getDuration()).toEqual(MOCK_DURATION);
        expect(positionMock).toHaveBeenCalled();
        expect(sut.getPosition()).toEqual(MOCK_POSITION);
      }));
    });

  });

  var MOCK_DURATION = 10000;
  var MOCK_POSITION = 0;

  var playMock = jasmine.createSpy('play').and.callFake(angular.noop);
  var durationMock = jasmine.createSpy('duration') .and.callFake(function () { return MOCK_DURATION; });
  var positionMock = jasmine.createSpy('position') .and.callFake(function () { return MOCK_POSITION; });

  function soundcloudStream(trackPath, callback) {
    callback({
      play: playMock,
      getDuration: durationMock,
      getCurrentPosition: positionMock
    });
  }

  function soundcloudGet() {


  }
})();
