#!/usr/bin/env bash

rep_url="https://github.com/Vebnik/yt-open-gui"
main_dir="yt-open-gui"
start_sh="start.sh"

git clone $rep_url && \
cd ./$main_dir && \
bash ./$start_sh

printf "Success install\n"
