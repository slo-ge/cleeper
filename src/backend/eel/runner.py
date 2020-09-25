import logging

import eel

from backend.config import DEFAULT_CONFIG
from backend.keypress.utils import keypress_listener

eel_logger = logging.getLogger(__name__)


def run():
    """ Starts the eel application and appends exposables which will be called from
    Java application.

    """
    # Set web files folder and optionally specify which file types to check for eel.expose()
    #   *Default allowed_extensions are: ['.js', '.html', '.txt', '.htm', '.xhtml']
    develop = DEFAULT_CONFIG.develop
    base_path = 'browser/app/'

    if develop:
        eel_logger.info('just using development mode for run, NOTE: this will not work with pyinstaller')
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
    spawn_threads()

    eel.start(page, size=(800, 800), options={
        'mode': app,
        'host': 'localhost',
        'port': 8080,
        'chrome-flags': flags
    })  # Start


def spawn_threads():
    eel.spawn(keypress_listener)
