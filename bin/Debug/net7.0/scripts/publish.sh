dotnet publish -c Release -o /mnt/data/prog/Wamfish/Builds/server -a arm64
cd /mnt/data/prog/Wamfish/Builds
tar cvf server.tar server/*
scp -i /home/roscoe/sshkeys/ssh-key-2022-02-08.key server.tar ubuntu@129.146.16.202:/home/ubuntu/server.tar