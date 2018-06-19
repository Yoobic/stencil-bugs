export interface IPhotoEditorData {
    data?: string;
    height?: number;
    width?: number;
    svg?: SVGElement;
    texts?: IPhotoAnnotation[];
}

export interface XYPoint {
    x: number;
    y: number;
}

export interface IPhotoAnnotation {
    percentX?: number;
    percentY?: number;
    widthHeightRatio?: number;
    text?: string;
    title?: string;
}