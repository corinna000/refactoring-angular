(function () {
  'use strict';

  describe('makes a search request and returns the results', function () {

    var element, $rootScope, $scope, StreamingAudio;

    beforeEach(module('slamOff', function ($provide) {
      $provide.factory('StreamingAudio', function () { return { search: angular.noop };});
    }));

    beforeEach(inject(function (_$rootScope_, $q, _StreamingAudio_) {
      $rootScope = _$rootScope_;
      StreamingAudio = _StreamingAudio_;
      $scope = $rootScope.$new();
      $scope.updateTracks = angular.noop;
      spyOn(StreamingAudio, 'search').and.returnValue($q.when(mockTracks()));
      spyOn($scope, 'updateTracks').and.callThrough();
    }));

    beforeEach(inject(function ($compile) {
      var html = '<so-search on-tracks-updated="updateTracks"></so-search>';
      element = $compile(html)($scope);
      $rootScope.$digest();
    }));

    it('creates the component', function () {
      var input = element.find('input');
      expect(input.length).toEqual(1);
    });

    it('should make an outgoing search request', function () {
      var form = element.find('form');
      var input = element.find('input');
      input.val('cream').triggerHandler('input');
      form.triggerHandler('submit');
      expect(StreamingAudio.search).toHaveBeenCalled();
    });

    it('should call onTracksUpdated with search results', function () {
      var form = element.find('form');
      form.triggerHandler('submit');
      expect($scope.updateTracks).toHaveBeenCalled();

    });


  });

  function mockTracks() {
    return [
      { title: 'test track 1', duration: 30000 },
      { title: 'test track 2', duration: 35000 }
    ];
  }

})();
