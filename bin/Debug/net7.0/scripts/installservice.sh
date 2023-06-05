#! /bin/bash
sudo cp /home/ubuntu/server/scripts/Wampage.service /etc/systemd/system #I think this is were it should go
#sudo cp /home/ubuntu/server/scripts/Wampage.service /usr/lib/systemd/system #maybe put it here. it is not clear
sudo systemctl enable Wampage #this should make it load on boot
sudo systemctl start Wampage
sudo systemctl status Wampage
sudo journalctl -u Wampage #show the log file
sudo journalctl --vacuum-files=5
