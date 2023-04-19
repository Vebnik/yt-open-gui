#!/usr/bin/env bash

chromium_dir="/usr/bin/chromium"
mpv_dir="/usr/bin/mpv"
python_dir="/usr/bin/python"
node_dir_system="/usr/bin/node"
node_dir_nvm="/home/$USER/.nvm/versions/node"


if ! [[ -f "${node_dir_system}" ]] && ! [[ -d "${node_dir_nvm}" ]]
    then
        printf "node or nvm not exist\n"
        exit
fi


if ! [[ -f "${python_dir}" ]]
    then
        printf "python not exist\n"
        exit
fi


if ! [[ -f "${chromium_dir}" ]]
    then
        printf "chromium not exist\n"
        exit
fi


if ! [[ -f "${mpv_dir}" ]]
    then
        printf "mpv not exist\n"
        exit
fi

