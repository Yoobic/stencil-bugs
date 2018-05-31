import { NohtmlPipe } from './nohtml.pipe';

describe('Pipe: NoHtmlPipe', () => {
    let noHtmlPipe: NohtmlPipe = new NohtmlPipe();
    xit('should strip out all html content, returning a plain text string', () => {
        let testHtml = '<div>Here is some html with a <a href="_blank">link</a> and a list: <ul><li>list item 1</li><li>list item 2</li></ul></div>';
        expect(noHtmlPipe.transform(testHtml)).toEqual('Here is some html with a link and a list: list item 1list item 2');
    });
    xit('should deal with html unicode values sensibly', () => {
        let testHtml = '<p>I don&#8217;t like punctuation</p>';
        expect(noHtmlPipe.transform(testHtml)).toEqual('I don’t like punctuation\n');
    });
    xit('should remove non breaking spaces and paragraph tags, replacing them with newlines', () => {
        let testHtml = '<p>I&nbsp;&nbsp;&nbsp; love spaces</p>Here &nbsp;&nbsp;too<p></p><div>I\'m a div</div>';
        expect(noHtmlPipe.transform(testHtml)).toEqual('I\n\n\n love spaces\nHere \n\ntoo\nI\'m a div');
    });
    it('shouldn\'t do anything if already in plain text format', () => {
        let testText = 'I\'m some regular text that\'s got no html';
        expect(noHtmlPipe.transform(testText)).toEqual(testText);
    });
});