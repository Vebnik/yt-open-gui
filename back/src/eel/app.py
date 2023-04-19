import eel
import logging
from typing import Any

from src.db.app import DbApp
from src.ytdlp.app import YtDlp


class Service:

    @staticmethod
    def on_close(path: str, ws_path: list[Any]) -> None:
        logging.info(f'closing ws - {path}')

        if not ws_path:
            exit()


class EelApp:

    db = DbApp()
    app_config = {
        'close_callback': Service.on_close,
        'size': (840, 640),
    }

    def __init__(self) -> None:
        try:
            logging.info('Init eel app')

            eel.init('../front/build')
            self.init_expose_command()
            eel.start('index.html', **self.app_config)
        except Exception as ex:
            logging.critical(ex)

    def init_expose_command(self) -> None:
        logging.info('Init expose_command')

        @eel.expose
        def waiting_video() -> list[Any]:
            return []

        @eel.expose
        def search_video(data: dict) -> list[Any]:
            return YtDlp.get_video_info(query=data.get('query'), limit=data.get('limit'))

        @eel.expose
        def init_mpv(video_id: str) -> bool:
            return YtDlp.start_mpv(video_id)

        @eel.expose
        def get_subs() -> list[dict]:
            return self.db.get_subs()

        @eel.expose
        def add_subs(channel_info: dict) -> None:
            self.db.create_subs(channel_info)

        @eel.expose
        def get_channel_info(video_id: str) -> dict:
            author = YtDlp.get_video_author(video_id)
            return YtDlp.get_channel_info(author.get('channel_url'))

        @eel.expose
        def get_channel_video(channel_id: str) -> list[dict]:
            return YtDlp.get_channel_video(channel_id)

        @eel.expose
        def delete_subs(channel_id: str) -> None:
            self.db.remove_subs(channel_id)
