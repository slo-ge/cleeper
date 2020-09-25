import LayoutSortableJsController from "./layout-sortablejs-controller";

let layoutController = new LayoutSortableJsController();

function createElementFromHTML(clipboardElemObj) {
    let div = document.createElement('div');
    div.innerHTML = clipboardElemObj.elem.trim();
    // unpack css classes
    // and set them to div
    div.classList.add(...clipboardElemObj.css_classes);
    return div;
}

function getClipboard() {
    let clipboardPromise = eel.get_latest_from_clipboard();
    clipboardPromise().then((clipboardElem) => {
        layoutController.add(createElementFromHTML(JSON.parse(clipboardElem)));
    });
}

eel.expose(getClipboard);
