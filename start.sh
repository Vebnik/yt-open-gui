#!/usr/bin/env bash

root_dir=$(pwd)
back_dir="./back"
front_dir="./front"
venv_dir="./back/venv/bin/activate"
build_dir="./front/build"
main_file="main.py"
chromium_dir="/usr/bin/chromium"
db="db.sqlite3"


# check dependency
if ! source ./dependency.sh
    then
        exit
fi


# rebuild
if [[ $1 = "rebuild" ]]
    then
        printf "rebuilding ...\n"
        source ./build.sh
fi


# check build and building
if ! [[ -d "${build_dir}" ]]
    then
        printf "build not exist -> building\n"
        if source ./build.sh
            then
                printf "build success\n"
            else
                exit
        fi
fi


# check venv \ db and start app
if [[ -f "${venv_dir}" ]] 
    then
        	printf "venv exist -> activate and start app\n"
    	
        	source $venv_dir && \
        cd $back_dir
        
        if ! [[ -f "${db}" ]]
        	    then
        	        python ./init_db.py
        fi
        
        python ./$main_file 
    else
        printf "venv and db not exist -> creating\n"
        
        python -m venv ./back/venv && \
        source $venv_dir && \
        cd $back_dir && \
        python -m pip install -r req.txt
        
        	if ! [[ -f "${db}" ]]
        	    then
        	        python ./init_db.py
	    fi
        
    	    python ./$main_file
fi
