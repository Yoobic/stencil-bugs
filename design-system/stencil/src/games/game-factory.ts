import { AbstractGame } from './abstract.game';
import { CardGame } from './card/card.game';
import { ExampleGame } from './example/example.game';
import { RunnerGame } from './runner/runner.game';

export const games: any = {
    runner: 'Runner',
    card: 'Card',
    example: 'Example'
};

export function gameFactory(name: string): AbstractGame {
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
