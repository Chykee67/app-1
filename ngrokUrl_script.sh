#!/bin/bash

echo "sleeping for 5 seconds to allow ngrok set up"

sleep 5

url=$(cat ngrok.log | grep 'url' | jq -r '.url')

echo "Ngrok Url: $url"