import os


def get_mpv_bin() -> str:
    if 'mpv' in os.listdir('/usr/bin/'):
        return '/usr/bin/mpv'
    return 'not_exist'

