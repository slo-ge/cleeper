enum ClipTypes {
    TEXT = 1,
    IMAGE = 2
}

export interface LegacyClipBoardItem {
    clip_type: ClipTypes;
    data: string;
    elem: string;
    css_classes: Array<string>;

}

export class ClipBoardItem {
    clipType: ClipTypes;
    data: string;
    elem: string;
    cssClasses: Array<string>;

    constructor(clipType: ClipTypes, data: string, elem: string, cssClasses: Array<string>) {
        this.clipType = clipType;
        this.data = data;
        this.elem = elem;
        this.cssClasses = cssClasses;
    }

    public static mapPythonStringDto(pythonString: string): ClipBoardItem {
        let tempJson: LegacyClipBoardItem = JSON.parse(pythonString);
        return new ClipBoardItem(
            tempJson.clip_type,
            tempJson.data,
            tempJson.elem,
            tempJson.css_classes
        )
    }
}