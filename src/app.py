import json
from enum import IntEnum
from typing import List

import eel
import keyboard
import pyperclip
import uuid

from utils import create_text_elem
from utils import get_img_elem


class ClipTypes(IntEnum):
    """
    NOTE: IntEnum Class can be serialized
    """
    TEXT = 1
    IMAGE = 2


class ClipBoardItem(object):
    def __init__(self, clip_type: ClipTypes, data: str, elem: str, css_classes: List, UID: str):
        self.clip_type = clip_type
        self.data = data
        self.elem = elem
        self.css_classes = css_classes
        self.UID = UID


clipboard_items: List[ClipBoardItem] = []


@eel.expose
def get_latest_from_clipboard() -> str:
    """

    :return: serialized ClipBoardItem for browser
    """
    return json.dumps(clipboard_items[-1].__dict__)


# listen to new screen shot
def keypress_listener():
    while True:  # making a loop
        eel.sleep(0.01)
        if keyboard.is_pressed('ctrl+l'):  # if key 'q' is pressed
            text = pyperclip.paste()  # get the text with pyperclip
            if text:
                text = text.replace('\r\n', '<br>')
                clipboard_items.append(
                    ClipBoardItem(
                        clip_type=ClipTypes.TEXT,
                        data=text,
                        elem=create_text_elem(text),
                        css_classes=['clipped', 'text'],
                        UID=str(uuid.uuid4())
                    )
                )
            else:
                clipboard_items.append(
                    ClipBoardItem(
                        clip_type=ClipTypes.IMAGE,
                        data='no data',
                        elem=get_img_elem(),
                        css_classes=['clipped', 'image'],
                        UID=str(uuid.uuid4())
                    )
                )

            print('call get_clipboard of')
            eel.get_clipboard()
            eel.sleep(1)  # and let eel sleep do prevent multiple pastes
        else:
            pass


def run():
    """
    run eel lib with keypress_listener

    """
    # Set web files folder and optionally specify which file types to check for eel.expose()
    #   *Default allowed_extensions are: ['.js', '.html', '.txt', '.htm', '.xhtml']
    develop = True
    base_path = 'browser/app/'

    if develop:
        directory = base_path + 'src'
        app = None
        page = {'port': 3000}
        flags = ['--auto-open-devtools-for-tabs --allow-file-access-from-files']
    else:
        directory = base_path + 'build'
        app = 'chrome-app'
        page = 'index.html'
        flags = []

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])
    eel.spawn(keypress_listener)

    eel.start(page, size=(800, 800), options={
        'mode': app,
        'host': 'localhost',
        'port': 8080,
        'chrome-flags': flags
    })  # Start


if __name__ == "__main__":
    run()
