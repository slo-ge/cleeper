import codecs
import io

from PIL import ImageGrab


def get_img_tag_from_clipboard():
    # TODO: we can also push it as a background property

    # Pull image from clibpoard
    img = ImageGrab.grabclipboard()
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')

    base64_data = codecs.encode(img_bytes.getvalue(), 'base64')
    base64_text = codecs.decode(base64_data, 'ascii')

    # TODO: clean up
    html_img_tag = "<div class=\"clipped image\"><img src=\"data:image/png;base64, %s\" /></div>" % base64_text

    return html_img_tag


def get_image_from_clipboard():
    """
    return qtpixmap
    
    """
    return ImageGrab.grabclipboard().toqpixmap()
