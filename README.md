# individual_project

Things to do to setup project:
* Launch cloudstack instance : go to https://cumulus01.doc.ic.ac.uk:8443/client/ and put doc username password and doc as the last field.
* Get sudo permissions : launch the instance ont he browser and run ``` usermod -G sudo pev115 ```
* install ethereum : follow the commands at https://www.ethereum.org/cli
* download the testrpc : run geth --testrpc
* install node js (npm) :follow  https://nodejs.org/en/download/package-manager/
* insall meteor: ``` curl https://install.meteor.com/ | sh ```
* Install Solidity compiler: ``` npm install solc ```  or from https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial
* install git : ``` sudo apt-get install git ```
* download the git repository:
* mount the vm to local servers
* make bash commands for automatic launching
* get the correct editor


# how to mount the VM to the labs:
* open nautilus (file system)
* go to connect to server
* enter smb://icnas2.cc.ic.ac.uk/pev115
* to find this can log in to the virtual machine and type ``` fd -h ```



 #Other things installed:
##Geneal packages
* truffle : ```npm install -g truffle``` -> probably will need to reinstall whenm used although -g indicates global install
* testrpc: ```nmp intsall -g  ethereumjs-testrpc``` -> probably will need to reistall when used. although -g indicates global install
* run ```npm install``` in  order to get the node_modules folder in project
* solc : ```meteor nmp install --save  solc``` : installed vertion 0.3.5 

##Meteor packages
* ++iron: router: ```meteor add iron:router ```  
* ++ session : ``` meteor add session```
* ++bootstrap : ```meteor add twbs: bootstrap```

##Atom packages
* meteor helper
* meteor-api
* meteor-snippets