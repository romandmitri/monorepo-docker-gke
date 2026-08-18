#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

# https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit

# ================== COLORS ===============================

function blue() {
	echo -e "[\033[38;5;25m$1\033[0m]"
}

function blue_light() {
	echo -e "[\033[38;5;33m$1\033[0m]"
}

function blue_highlight() {
	echo -e "[\033[1;44m$1\033[0m]"
}

function cyan() {
	echo -e "[\033[38;5;37m$1\033[0m]"
}

function cyan_light() {
	echo -e "[\033[38;5;80m$1\033[0m]"
}

function green() {
	echo -e "[\033[38;5;2m$1\033[0m]"
}

function green_light() {
	echo -e "[\033[38;5;10m$1\033[0m]"
}

function green_highlight() {
	echo -e "[\033[0;42m$1\033[0m]"
}

function magenta() {
	echo -e "[\033[38;5;97m$1\033[0m]"
}

function magenta_highlight() {
	echo -e "[\033[0;45m$1\033[0m]"
}

function red() {
	echo -e "[\033[38;5;1m$1\033[0m]"
}

function red_light() {
	echo -e "[\033[38;5;9m$1\033[0m]"
}

function red_highlight() {
    echo -e "[\033[0;41m$1\033[0m]"
}

function yellow() {
	echo -e "[\033[38;5;3m$1\033[0m]"
}

function yellow_light() {
	echo -e "[\033[38;5;11m$1\033[0m]"
}

function yellow_highlight() {
	echo -e "[\033[0;43m$1\033[0m]"
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
