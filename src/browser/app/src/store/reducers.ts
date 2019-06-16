import {AppState} from "../App";
import {ClibBoardItemActionTypes, CLIPBOARD_ITEM_DELETE, CLIPBOARD_ITEM_PUSH} from "./action-types";

const initialState: AppState = {
    clipBoardItems: []
}

export function clipBoardReducer(
    state = initialState,
    action: ClibBoardItemActionTypes
) {
    switch (action.type) {
        // on delete we just filter the deleted message
        case CLIPBOARD_ITEM_DELETE:
            return {
                clipBoardItems: state.clipBoardItems.filter(
                    item => item.UID !== action.payload.UID
                )
            };
        // on add we just add the new message to the state
        case CLIPBOARD_ITEM_PUSH:
            return {
                clipBoardItems: [...state.clipBoardItems, action.payload]
            };

        default:
            return state;
    }
}