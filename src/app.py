"""Cleeper
http://docopt.org/

Usage:
  app.py --config-path=<path>

Options:
todo:  --config-path=<path>  default is: config/default.ini

"""

from backend.eel.runner import run


def start():
    run()

if __name__ == "__main__":
    start()
