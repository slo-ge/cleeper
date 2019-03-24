import codecs
import io

from PIL import ImageGrab


def get_img_elem():
    """
    get image elem from clipboard

    :return:
    """

    # Pull image from clibpoard
    img = ImageGrab.grabclipboard()
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')

    base64_data = codecs.encode(img_bytes.getvalue(), 'base64')
    base64_text = codecs.decode(base64_data, 'ascii')

    return f'<img src="data:image/png;base64, {base64_text}" />'


def create_text_elem(text):
    """ create text elem from text

    :return:
    """
    return f'<p>{text}</p>'


def get_image_from_clipboard():
    """
    return qtpixmap
    
    """
    return ImageGrab.grabclipboard().toqpixmap()
