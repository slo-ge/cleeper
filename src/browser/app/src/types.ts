enum ClipTypes {
    TEXT = 1,
    IMAGE = 2
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

// state management types
// TODO: move to store folder which does not exist in the moment
export const CLIPBOARD_ITEM_PUSH= 'CLIPBOARD_ITEM_PUSH';
export const CLIPBOARD_ITEM_DELETE = 'CLIPBOARD_ITEM_DELETE';

export interface ClipBoardItemList {
    items: Array<ClipBoardItem>
}

interface PushClipBoardItem {
    type: typeof CLIPBOARD_ITEM_PUSH
    payload: ClipBoardItem;
}

interface DeleteClipBoardItem {
    type: typeof CLIPBOARD_ITEM_DELETE
    payload: ClipBoardItem;
}

export type ClibBoardItemActionTypes = PushClipBoardItem | DeleteClipBoardItem;