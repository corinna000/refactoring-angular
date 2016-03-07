(function () {
  'use strict';

  var TRACK_DURATION, TRACK_POSITION;

  describe('track player progress bar', function () {

    var $rootScope, trackPlayerMock, element;

    beforeEach(module('slamOff', function ($provide) {
      TRACK_DURATION = 10000;
      TRACK_POSITION = 0;

      trackPlayerMock = function () {
        return {
          getDuration: jasmine.createSpy('duration').and.callFake(function () {
            return TRACK_DURATION;
          }),
          getPosition: jasmine.createSpy('position').and.callFake(function () {
            return TRACK_POSITION;
          })
        }
      };

      $provide.service('trackPlayer', trackPlayerMock);
    }));

    beforeEach(inject(function ($compile, _$rootScope_) {
      var html;
      $rootScope = _$rootScope_;
      html = '<so-track-progress></so-track-progress>';
      element = $compile(html)($rootScope.$new());
      $rootScope.$digest();
    }));

    it('should display a progress bar', function () {
      var progressBar = angular.element(element[0].querySelector('.progress-bar'));
      expect(progressBar.html()).toBeDefined();
    });

    it('should advance the progress bar when the track position increases', inject(function ($interval) {
      var progressBar = angular.element(element[0].querySelector('.progress-bar'));
      expect(progressBar.css('width')).toEqual(0 + '%');
      TRACK_POSITION = TRACK_DURATION / 2;
      $interval.flush(100);
      expect(progressBar.css('width')).toEqual(50 + '%');

    }));

  });

})();
