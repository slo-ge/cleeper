from PIL import ImageGrab


def get_image_from_clipboard():
    """
    return qtpixmap

    """
    return ImageGrab.grabclipboard().toqpixmap()
