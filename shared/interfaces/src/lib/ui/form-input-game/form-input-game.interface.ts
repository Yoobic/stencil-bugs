export interface IAbstractGameEntry {
    // common props of phaser games needed in constructor
    fieldId: string;
    assetDir?: string;
}

export interface IInputGameEntry {
    name: string;
    props: IAbstractGameEntry;
}