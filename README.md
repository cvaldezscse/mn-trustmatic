# mn-trustmatic
A Console application dedicated to distribute the masternode rewards to make it easier and faster to send the respective amount on shared masternodes.
It was created and tested using $PAC Cryptocurrency, but has features that makes it compatible with others.

If you are sharing a masternode with more than one person, is not the fastest way to make the payment of the rewards to each person. So the main motivation of this project is to automate this process and avoid to lose time sending the respective payments to each person

### Prerequisites

What things you need to install the software and how to install them

```
1. Cryptocurrency Wallet based on Bitcoin and compatible with MN.
2. RPC Server Configured.
3. Some destination addresses saved in the Wallet.
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
$ git clone https://github.com/cvaldezissc/mn-trustmatic.git
$ cd mn-trustmatic

#=====================================================================
# This is for you to introduce your own configurations, including connection to RPC
#=====================================================================
$ nano settings.json

$ npm install
$ node index.js
```

### RPC Configuration by OS (tested with $PAC):
**Disclaimer** those steps can be reproduced in all cryptocurrency wallets that are compatible with masternodes
   
* Linux:

    ```
    $ nano ~/.paccoincore/paccoin.conf
    ```

* Mac OS
    ```
    $ nano ~/Users/your_user/Library/Application Support/PaccoinCore/paccoin.conf
    ```
    
* Windows

    ```
    Windows Key + R
    Type %appdata% + enter
    Go and find paccoin.conf file and open it with any Text Editor
    ```

And change the configuration with the next values:

    
       #=========================================================
       # Add the configuration to the file
       #=========================================================
       rpcuser=yourrpcusername
       rpcpassword=yourpassword
       rpcport=7112
       rpchost=localhost
    
    

## Issues and new features

If you found a new issue please report it to [Project Issues](https://github.com/cvaldezissc/mn-trustmatic/issues/new). 

And if you want to add a new feature, please feel free to make a PR with this template [PR Template](https://github.com/cvaldezissc/mn-trustmatic/tree/master/docs/PR_TEMPLATE.md)




## Built With

* [Node JS](https://nodejs.org/download/release/v8.11.4/) - NodeJS v8.11.4
* [NPM](https://stackoverflow.com/a/44880273/6604217) - NPM v5.6.0
* [Mongo DB](https://docs.mongodb.com/manual/release-notes/4.0/?_ga=2.253379082.2041295965.1539547053-272326873.1539547053#download) - MongoDB v4.0.3


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [Tags](https://github.com/cvaldezissc/mn-trustmatic/tags). 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.