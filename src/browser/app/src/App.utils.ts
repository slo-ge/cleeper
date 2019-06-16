import {Exposables} from "./types";

export class AppUtils {

    static initializeEel(): any {
        console.log('initialize Eel..');

        const eel = window.eel;
        eel.set_host('ws://localhost:8080');
        // register event
        window.eel.expose(this.getClipboard, 'get_clipboard');
        this.getClipboard();

        return eel;
    }

    // for listing to event which will be triggerd from python
    static getClipboard() {
        window.dispatchEvent(new CustomEvent(Exposables.getClipBoard));
    }

    static reorder(list: Array<any>, startIndex: number, endIndex: number) {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

}