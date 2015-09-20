describe('voting track directive', function () {

  'use strict';

  var element, scope;

  var testTrack = {
    title: 'my test track',
    duration: 50000,
    votes: 0
  };
  beforeEach(module('slamOff'));

  beforeEach(module(mockTrackPlayer));

  beforeEach(inject(function ($compile, $rootScope) {
    var html = '<so-voting-track track="track"></so-voting-track>';
    scope = $rootScope.$new();
    scope.track = testTrack;
    element = $compile(html)(scope);
    $rootScope.$digest();
  }));

  it('displays the track name', function () {
    expect(element.html()).toMatch(new RegExp(testTrack.title));
  });

  it('displays the track duration', function () {
    var time = new Date(testTrack.duration);
    var duration = time.getMinutes() + ':' + time.getSeconds(); // 00:50
    expect(element.html()).toMatch(new RegExp(duration));
  });

  describe('voting track controls', function () {

    describe('play and stop tracks', function () {
      var playButton, stopButton;

      beforeEach(function () {
        playButton = angular.element(element[0].querySelector('.play'));
        stopButton = angular.element(element[0].querySelector('.stop'));
      });

      it('has a play button', function () {
        expect(playButton.length).toEqual(1);
      });

      it('fires the trackPlayer play function', inject(function (trackPlayer) {
        playButton.triggerHandler('click');

        // stops any playing track first
        expect(trackPlayer.stop).toHaveBeenCalled();

        // starts playing the new track
        expect(trackPlayer.play).toHaveBeenCalledWith(testTrack);
      }));

      it('has a stop button', function () {
        expect(stopButton.length).toEqual(1);
      });

      it('fires the trackPlayer stop function', inject(function (trackPlayer) {
        stopButton.triggerHandler('click');
        expect(trackPlayer.stop).toHaveBeenCalled();
      }));
    });
  });

  /* Mocks and Helpers */

  function mockTrackPlayer ($provide) {
    var trackPlayer = function () {
      return {
        play: jasmine.createSpy('play').and.callFake(angular.noop),
        stop: jasmine.createSpy('stop').and.callFake(angular.noop)
      };
    };
    $provide.service('trackPlayer', trackPlayer);
  }
});
