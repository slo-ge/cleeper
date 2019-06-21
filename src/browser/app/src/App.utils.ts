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

    static uuidv4(): string {

        // @ts-ignore
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(
                new Uint8Array(1))[0] & 15 >> c / 4
            ).toString(16)
        )
    }
}