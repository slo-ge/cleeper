import eel
import keyboard
import pyperclip

from utils import get_img_tag_from_clipboard

# Set web files folder and optionally specify which file types to check for eel.expose()
#   *Default allowed_extensions are: ['.js', '.html', '.txt', '.htm', '.xhtml']
eel.init('browser/', allowed_extensions=['.js', '.html'])


clipboard_items = []


@eel.expose
def get_latest_from_clipboard():
    return clipboard_items[-1]


# listen to new screenshot
def keypress_listener():
    print("key press listener")
    while True:  # making a loop
        eel.sleep(0.01)
        try:  # used try so that if user pressed other than the given key error will not be shown
            if keyboard.is_pressed('ctrl+l'):  # if key 'q' is pressed
                text = pyperclip.paste()  # get the text with pyperclip
                if text:
                    # we set the text to clipboard list
                    clipboard_items.append(f'<div class="clipped text">{text}</div>')
                else:
                    # we try to set the image to clipboard list
                    clipboard_items.append(get_img_tag_from_clipboard())

                eel.getClipboard()
                eel.sleep(1)  # and let eel sleep do prevent multiple pastes
            else:
                pass
        except:
            break


eel.spawn(keypress_listener)

eel.start('templates/app.html', size=(800, 800),
          templates='templates')  # Start

