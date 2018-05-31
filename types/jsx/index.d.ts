
declare namespace JSX {
    interface Element { }
    export interface IntrinsicElements { }
}
declare  namespace JSXElements { }

interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
}

interface HTMLAttributes { }
