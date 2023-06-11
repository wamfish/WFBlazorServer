#! /bin/bash
sudo cp WFBlazorServer.service /etc/systemd/system #I think this is were it should go
sudo systemctl enable WFBlazorServer #this should make it load on boot
sudo systemctl start WFBlazorServer
sudo systemctl status WFBlazorServer
sudo journalctl -u WFBlazorServer #show the log file
sudo journalctl --vacuum-files=5
