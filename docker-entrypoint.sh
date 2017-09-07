#!/bin/bash

ruby config.rb /usr/share/nginx/html/config.json

nginx -g 'daemon off;'
