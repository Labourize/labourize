## Generate Keys:

```sh
openssl genrsa -out jwt-private.key 2048
openssl rsa -in jwt-private.key -pubout -out jwt-public.key
```

# server setup

## user data

### install docker
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" -y

apt-cache policy docker-ce

sudo apt install docker-ce -y

#sudo systemctl status docker

sudo su - ${USER}

### install docker compose
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose

chmod +x ~/.docker/cli-plugins/docker-compose

docker compose version

### install nvm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

source ~/.bashrc

### install yarn

npm install -g yarn
