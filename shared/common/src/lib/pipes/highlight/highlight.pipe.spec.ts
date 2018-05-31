import { HighlightPipe } from './highlight.pipe';

describe('Pipe: HighlightPipe', () => {
    let highlightPipe: HighlightPipe = new HighlightPipe();
    it('should apply the strong tag to a specified query within a string', () => {
        let testString: string = 'This is a sentence to highlight bits of';
        expect(highlightPipe.transform(testString, 'highlight bits'))
            .toEqual('This is a sentence to <strong>highlight bits</strong> of');
    });
});