#!/usr/bin/env bash

back_dir="./back"
front_dir="./front"
venv_dir="./back/venv/bin/activate"
node_dir="./front/node_modules"
main_file="main.py"

if [[ $node_dir ]]
    then
    	printf "start building ...\n"
    	
        cd $front_dir && \
        npm run build
    else
    	printf "node modules not exist -> creating\n"
    	
        cd $front_dir && \
        npm install && \
        npm run build
fi
