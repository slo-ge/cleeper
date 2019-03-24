function createElementFromHTML(clipboardElemObj) {
    let div = document.createElement('div');
    div.innerHTML = clipboardElemObj.elem.trim();
    // unpack css classes
    // and set them to div
    div.classList.add(...clipboardElemObj.css_classes);
    return div;
}

// register getClipboard for python
eel.expose(getClipboard);

function getClipboard() {
    let clipboardPromise = eel.get_latest_from_clipboard();
    clipboardPromise().then((clipboardElem) => {
        document.getElementById('clips').append(
            createElementFromHTML(JSON.parse(clipboardElem))
        );
    });
}
