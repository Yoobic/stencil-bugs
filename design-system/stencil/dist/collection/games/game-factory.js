import { CardGame } from './card/card.game';
import { ExampleGame } from './example/example.game';
import { RunnerGame } from './runner/runner.game';
export const games = {
    runner: 'Runner',
    card: 'Card',
    example: 'Example'
};
export function gameFactory(name) {
    switch (name) {
        case games.runner:
            return new RunnerGame();
        case games.card:
            return new CardGame();
        case games.example:
            return new ExampleGame();
        default:
            return null;
    }
}
