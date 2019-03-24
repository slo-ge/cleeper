import eel
import keyboard
import pyperclip
import json

from enum import IntEnum
from utils import get_img_elem
from utils import create_text_elem
from typing import List


class ClipTypes(IntEnum):
    """
    NOTE: IntEnum Class can be serialized
    """
    TEXT = 1
    IMAGE = 2


class ClipBoardItem(object):
    def __init__(self, clip_type: ClipTypes, data: str, elem: str, css_classes: List):
        self.clip_type = clip_type
        self.data = data
        self.elem = elem
        self.css_classes = css_classes


clipboard_items: List[ClipBoardItem] = []

# Set web files folder and optionally specify which file types to check for eel.expose()
#   *Default allowed_extensions are: ['.js', '.html', '.txt', '.htm', '.xhtml']
eel.init('browser/', allowed_extensions=['.js', '.html'])


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
                clipboard_items.append(
                    ClipBoardItem(
                        clip_type=ClipTypes.TEXT,
                        data=text,
                        elem=create_text_elem(text),
                        css_classes=['clipped', 'text']
                    )
                )
            else:
                clipboard_items.append(
                    ClipBoardItem(
                        clip_type=ClipTypes.IMAGE,
                        data='no data',
                        elem=get_img_elem(),
                        css_classes=['clipped', 'image']
                    )
                )

            eel.getClipboard()
            eel.sleep(1)  # and let eel sleep do prevent multiple pastes
        else:
            pass


eel.spawn(keypress_listener)

eel.start('templates/app.html', size=(800, 800),
          templates='templates')  # Start
