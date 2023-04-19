from src.eel.app import EelApp
import logging


def main() -> None:
    logging.basicConfig(level=logging.INFO)
    EelApp()


if __name__ == '__main__':
    main()
