import { gameFactory, games } from './game-factory';
import { CardGame } from './card/card.game';
import { ExampleGame } from './example/example.game';
import { RunnerGame } from './runner/runner.game';

describe('Games', () => {
  describe('Factory', () => {
    it('Should return null if the object can not be created', () => {
      let game = gameFactory(null);
      expect(game).toBeNull();
    });

    it('Should return a Card game', () => {
      let game = gameFactory(games.card);
      expect(game).toEqual(new CardGame());
    });

    it('Should return a Runner game', () => {
      let game = gameFactory(games.runner);
      expect(game).toEqual(new RunnerGame());
    });

    it('Should return an Example game', () => {
      let game = gameFactory(games.example);
      expect(game).toEqual(new ExampleGame());
    });
  });
});
