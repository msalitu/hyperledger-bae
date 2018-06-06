# INSTRUCCIONES PARA DESPLEGAR LA PRUEBA DE CONCEPTO DEL BAE EN HYPERLEDGER

CoNWeT Hyperledger Network


## Si no es la primera vez que se despliega hay que eliminar los rastros de cualquier set up anterior
```
cd ~/fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh
./teardownAllDocker.sh
./downloadFabric.sh
rm -fr ~/.composer
```
Opcional pero casi nunca hace falta, realizar este comando y proceder como si se instalase por primera vez
```
rm -rf ~/fabric-dev-servers
```




## Si se instala por primera vez
```
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
cd ~/fabric-dev-server
./downloadFabric.sh
```




## Iniciar fabric 
Utilizar estos comandos de uno en uno comprobando que aparezca el mensaje `Command succeeded`
```
cd ~/fabric-dev-server
```
```
./startfabric.sh
```
```
./createPeerAdminCard.sh
```
Para obtener los ficheros de nuestra configuracion, si es la primera vez ejecuta:
```
cd hyperledger-bae
git clone https://github.com/msalitu/hyperledger-bae.git
```
Si no es la primera vez, ejecuta simplemente:
```
cd hyperledger-bae
git pull
```
## Si se hace cualquier cambio en un fichero hay que generar de nuevo el .bna
```
composer archive create -t dir -n .
```




## Desplegar la business network

Instalar la bunsiness network en el peer, hace falta una business network card
```
composer network install --card PeerAdmin@hlfv1 --archiveFile conwet-network@0.0.1.bna
```
Start la business network, hace falta una business network card y crear identitiy del administrador de la business network
```
composer network start --networkName conwet-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
Se importa la identidad del administrador de la business network como business network card
```
composer card import --file networkadmin.card
```
Para comprobar que la business network se ha desplegado correctamente:
```
composer network ping --card admin@conwet-network
```





## Para usar el playground
```
composer-playground
```
Acceder a http://localhost:8080/





## Para usar el REST server
```
composer-rest-server
```
Enter the name of the business network card to use: admin@conwet-network y todo lo demas por defecto

Acceder a http://localhost:3000/explorer/
