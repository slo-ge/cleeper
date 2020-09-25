enum ClipTypes {
    TEXT = 1,
    IMAGE = 2
}

export enum Exposables {
    getClipBoard = 'getClipBoard'
}

export interface LegacyClipBoardItem {
    clip_type: ClipTypes;
    data: string;
    elem: string;
    css_classes: Array<string>;
    UID: string;

}

export class ClipBoardItem {
    clipType: ClipTypes;
    data: string;
    elem: string;
    cssClasses: Array<string>;
    UID: string;
    constructor(clipType: ClipTypes, data: string, elem: string, cssClasses: Array<string>, UID: string) {
        this.clipType = clipType;
        this.data = data;
        this.elem = elem;
        this.cssClasses = cssClasses;
        this.UID = UID;
    }

    public static mapPythonStringDto(pythonString: string): ClipBoardItem {
        let tempJson: LegacyClipBoardItem = JSON.parse(pythonString);
        return new ClipBoardItem(
            tempJson.clip_type,
            tempJson.data,
            tempJson.elem,
            tempJson.css_classes,
            tempJson.UID
        )
    }
}