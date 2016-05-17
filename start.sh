#!/bin/bash

echo "Setting environment variables..."
source pushbullet.env
export $(cut -d= -f1 pushbullet.env)

echo "Starting server"
node main.js $1
