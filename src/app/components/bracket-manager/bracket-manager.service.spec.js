(function () {

  'use strict';

  describe('bracket manager service', function () {

    var sut, $rootScope;

    var tracks;

    beforeEach(module('slamOff'));

    beforeEach(inject(function (bracketManager, _$rootScope_, TrackModel) {
      sut = bracketManager;
      $rootScope = _$rootScope_;
      // initialize mock tracks
      tracks = [
        { id: 101, title: 'track one' },
        { id: 102, title: 'track two' },
        { id: 103, title: 'track three' },
        { id: 104, title: 'track four' },
        { id: 105, title: 'track five' },
        { id: 106, title: 'track six' },
        { id: 107, title: 'track seven' },
        { id: 108, title: 'track eight' }
      ];
      //factory function
      tracks = tracks.map(function (track) {
        return new TrackModel(track);
      });

    }));

    describe('setup', function () {

      it('initializes a new bracket', function () {
        var matchingTracks;
        expect(sut.initialize).toBeDefined();

        // requires an array of tracks
        sut.initialize(tracks);

        // tracks should be randomized, so we can't
        // expect the first track to be the same one we sent
        matchingTracks = tracks.filter(function (item) {
          return item.id === sut.tracks[0].id;
        });

        expect(matchingTracks.length).toEqual(1);
      });

    });

    describe('voting', function () {

      var track, round;

      beforeEach(inject(function (TrackModel) {
        round = 0;
        track = new TrackModel({ id: 100, description: 'my track' });
      }));

      it('is defined', function () {
        expect(sut.vote).toBeDefined();
      });

      it('records a vote', function () {
        var args;

        spyOn(sut, 'vote').and.callThrough();

        sut.vote(round, track); // round, track
        args = sut.vote.calls.argsFor(0);

        expect(args[0]).toEqual(round);
        expect(args[1]).toEqual(track);
      });

      it('tracks the winners in previous rounds', function () {
        var winner;

        // make sure it exists
        expect(sut.getWinner).toBeDefined();

        // see if a vote is counted
        sut.vote(round, track);
        winner = sut.getWinner(round);
        expect(winner).toEqual(track);
      });

      it('tracks the winners (many votes)', function () {
        sut.vote(0, tracks[0]);
        sut.vote(1, tracks[1]);
        sut.vote(2, tracks[2]);
        expect(sut.getWinner(0)).toEqual(tracks[0]);
        expect(sut.getWinner(1)).toEqual(tracks[1]);
        expect(sut.getWinner(2)).toEqual(tracks[2]);
      });
      //

      it('calculates whether to show current round', function () {

        // no voting has happened yet, all early round should be visible
        expect(sut.showCurrentRound(0)).toEqual(true);
        expect(sut.showCurrentRound(1)).toEqual(true);
        expect(sut.showCurrentRound(2)).toEqual(true);
        expect(sut.showCurrentRound(3)).toEqual(true);

        sut.vote(0, tracks[0]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(true);
        expect(sut.showCurrentRound(2)).toEqual(true);
        expect(sut.showCurrentRound(3)).toEqual(true);

        sut.vote(1, tracks[0]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(false);
        expect(sut.showCurrentRound(2)).toEqual(true);
        expect(sut.showCurrentRound(3)).toEqual(true);
        expect(sut.showCurrentRound(4)).toEqual(true);

        // skip to the first semi-final
        sut.vote(4, tracks[0]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(false);
        // have not voted for these two yet:
        expect(sut.showCurrentRound(2)).toEqual(true);
        expect(sut.showCurrentRound(3)).toEqual(true);

        expect(sut.showCurrentRound(4)).toEqual(false);
        expect(sut.showCurrentRound(5)).toEqual(false);
        expect(sut.showCurrentRound(6)).toEqual(false);

        // finish all the early voting
        sut.vote(2, tracks[1]);
        sut.vote(3, tracks[2]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(false);
        expect(sut.showCurrentRound(2)).toEqual(false);
        expect(sut.showCurrentRound(3)).toEqual(false);
        expect(sut.showCurrentRound(4)).toEqual(false);
        expect(sut.showCurrentRound(5)).toEqual(true);
        expect(sut.showCurrentRound(6)).toEqual(false);

        // finish semi-final voting
        sut.vote(5, tracks[1]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(false);
        expect(sut.showCurrentRound(2)).toEqual(false);
        expect(sut.showCurrentRound(3)).toEqual(false);
        expect(sut.showCurrentRound(4)).toEqual(false);
        expect(sut.showCurrentRound(5)).toEqual(false);
        expect(sut.showCurrentRound(6)).toEqual(true);

        sut.vote(6, tracks[1]);
        expect(sut.showCurrentRound(0)).toEqual(false);
        expect(sut.showCurrentRound(1)).toEqual(false);
        expect(sut.showCurrentRound(2)).toEqual(false);
        expect(sut.showCurrentRound(3)).toEqual(false);
        expect(sut.showCurrentRound(4)).toEqual(false);
        expect(sut.showCurrentRound(5)).toEqual(false);
        expect(sut.showCurrentRound(6)).toEqual(false);

      });
    });

  });

})();
