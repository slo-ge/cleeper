import {ClibBoardItemActionTypes, CLIPBOARD_ITEM_DELETE, CLIPBOARD_ITEM_PUSH, ClipBoardItem} from "../types";


export function pushItem(item: ClipBoardItem): ClibBoardItemActionTypes {
    return {
        type: CLIPBOARD_ITEM_PUSH,
        payload: item
    };
}

export function deleteItem(item: ClipBoardItem): ClibBoardItemActionTypes {
    return {
        type: CLIPBOARD_ITEM_DELETE,
        payload: item
    };
}