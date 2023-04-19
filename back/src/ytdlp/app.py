from typing import Any
from yt_dlp import YoutubeDL
from os import popen

from src.utils.mpv import get_mpv_bin


class YtDlp:
    ydl = YoutubeDL({
        'noplaylist': True,
        'extract_flat': True,
        'no_download': True,
    })

    @classmethod
    def get_video_author(cls, video_id: str) -> dict:
        video_raw_info = cls.ydl.extract_info(video_id, download=False)

        return {
            'title': video_raw_info.get('channel', ''),
            'channel_url': video_raw_info.get('channel_url', ''),
            'channel_id': video_raw_info.get('channel_id', '')
        }

    @classmethod
    def get_video_info(cls, query: str, limit: int = 1) -> list[Any]:
        video_raw_info = cls.ydl.extract_info(f"ytsearch{limit}:{query}", download=False)

        video_info = [
            {
                'id': item.get('id', 0),
                'title': item.get('title', ''),
                'thumbnail': item.get('thumbnails', [{}])[0].get('url', ''),
            } for item in video_raw_info.get('entries')
        ]

        return video_info

    @classmethod
    def get_all_channel_video(cls, query: str) -> list[Any]:
        raw_info = cls.ydl.extract_info(query, download=False)

        videos_info = [
            {
                'id': item.get('id', 0),
                'title': item.get('title', ''),
                'thumbnail': item.get('thumbnails', [{}])[0].get('url', ''),
            } for item in raw_info.get('entries')[0].get('entries')
        ]

        print(videos_info)
        return videos_info

    @classmethod
    def start_mpv(cls, video_id) -> bool:
        url = f'https://youtu.be/{video_id}'
        path = get_mpv_bin()

        if path == 'not_exist':
            return False

        popen(f'{path} {url}')

    @classmethod
    def get_channel_info(cls, query: str) -> dict:
        raw_info = cls.ydl.extract_info(f'{query}')

        avatar = lambda: raw_info.get('thumbnails', [{}, {}])[-1].get('url', '') \
            if len(raw_info.get('thumbnails', [])) > 1 \
            else raw_info.get('thumbnails', [{}, {}])[0].get('url', '')

        return {
            'id': raw_info.get('id', 0),
            'title': raw_info.get('title', ''),
            'channel_follower_count': raw_info.get('channel_follower_count', 0),
            'description': raw_info.get('description', ''),
            'videos': len(raw_info.get('entries', [{}])[0].get('entries', '')),
            'avatar': avatar() if raw_info.get('thumbnails', []) else '',
        }

    @classmethod
    def get_channel_video(cls, channel_id) -> list[dict]:
        raw_info = cls.ydl.extract_info(f'https://www.youtube.com/channel/{channel_id}')
        tmp_data = []

        for item in raw_info.get('entries', [{}]):
            if item.get('_type', '') == 'playlist':
                tmp_data.extend([
                    {
                        'id': video_item.get('id', 0),
                        'title': video_item.get('title', ''),
                        'thumbnail': video_item.get('thumbnails', [{}])[0].get('url', ''),
                    } for video_item in item.get('entries', [{}])
                ])
            if item.get('_type', '') == 'url':
                tmp_data.append({
                    'id': item.get('id', 0),
                    'title': item.get('title', ''),
                    'thumbnail': item.get('thumbnails', [{}])[0].get('url', ''),
                })

        return tmp_data
