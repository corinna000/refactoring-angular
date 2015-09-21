(function () {
  'use strict';

  var sut, $rootScope;

  describe('track search service', function () {

    var getSpy, soundcloudMock;

    beforeEach(module('slamOff', function ($provide) {
      getSpy = jasmine.createSpy('get').and.callFake(function (path, opts, cb) { cb([]); });
      soundcloudMock = { get: getSpy };
      $provide.value('soundcloud', soundcloudMock);
    }));

    beforeEach(inject(function (trackSearch, _$rootScope_) {
      sut = trackSearch;
      $rootScope = _$rootScope_;
    }));

    it('calls the soundcloud service', function (done) {
      var args, promise = sut.search('winter');
      $rootScope.$digest();

      // test the call
      args = getSpy.calls.argsFor(0);
      expect(getSpy).toHaveBeenCalled();

      // calls with our search term
      expect(args[1].q).toMatch(/winter/);

      // test the promise
      promise.then(success);
      $rootScope.$digest();

      function success(data) {
        expect(data).toBeDefined();
        done();
      }
    });

  });

})();
