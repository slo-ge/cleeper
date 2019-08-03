import json
import logging
import uuid
from enum import IntEnum
from typing import List

import eel
import keyboard
import pyperclip

from backend.config import DEFAULT_CONFIG
from backend.utils.html import create_text_elem, get_img_elem

eel_logger = logging.getLogger(__name__)


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
    """TODO: i do not now exactly where i have to put this method,
    maybe we can but it else where

    """

    eel_logger.info('call from javascript')
    """
    :return: serialized ClipBoardItem for browser
    """
    return json.dumps(clipboard_items[-1].__dict__)


def keypress_listener():
    while True:  # making a loop
        eel.sleep(0.01)
        if keyboard.is_pressed(DEFAULT_CONFIG.paste_key):  # if key 'q' is pressed
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
