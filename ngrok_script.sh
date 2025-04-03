#!/bin/bash

ngrok config add-authtoken 2vAXTkqkYyVedn0obKZFFvVueBP_Msu3t3D6yY4yeS9C7u7c

ngrok http 80 --log-format=json --log stdout > ngrok.log

#url=$(awk -F',' '/url/' ngrok.log | jq -r '.url')

#echo "Ngrok URL: $url"