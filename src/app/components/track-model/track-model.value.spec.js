(function () {

  describe('track model', function (){

    beforeEach(module('slamOff'));

    it('has a vote property', inject(function (TrackModel) {

      var track = new TrackModel({});
      expect(track.votes).toBeDefined();
      expect(track.votes).toEqual(0);

    }));

    it('has a vote function', inject(function(TrackModel) {
      var track = new TrackModel({});
      expect(track.votes).toEqual(0);
      track.addVote();
      expect(track.votes).toEqual(1);

    }));

  });

})();
