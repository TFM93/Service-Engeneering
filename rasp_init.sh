
sudo pacman -Syu wget git python2 zsh
wget https://bootstrap.pypa.io/get-pip.py
sudo python2 get-pip.py
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
git clone https://github.com/TFM93/Service-Engeneering.git
cd Service-Engeneering
git checkout Raspberry_ticket_dispenser