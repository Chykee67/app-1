#!/bin/bash

echo "sleeping for 10 seconds to allow ngrok set up"

sleep 10

url=$(cat ngrok.log | grep 'url' | jq -r '.url')

echo "Ngrok Url: $url"

echo "Proceeding to building backend"