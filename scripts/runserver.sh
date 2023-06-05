#! /bin/bash
export DOTNET_ROOT=/home/ubuntu/.dotnet
export PATH=$PATH:$DOTNET_ROOT
cd /home/ubuntu/server
#sudo setcap CAP_NET_BIND_SERVICE=+eip Wampage.Server #this is now done in Wampage.service
./WFServer --urls "http://0.0.0.0:80;https://0.0.0.0:443" 
