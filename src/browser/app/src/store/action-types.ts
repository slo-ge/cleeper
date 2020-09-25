// state management types
// TODO: move to store folder which does not exist in the moment
import {ClipBoardItem} from "../types";

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