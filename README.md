# mn-trustmatic &middot;  [![Circle CI Status](https://circleci.com/gh/cvaldezissc/mn-trustmatic.svg?style=shield)](https://circleci.com/gh/cvaldezissc/mn-trustmatic)
A Console application dedicated to distribute the masternode rewards to make it easier and faster to send the respective amount on shared masternodes.
It was created and tested using $PAC Cryptocurrency, but has features that makes it compatible with others.

If you are sharing a masternode with more than one person, is not the fastest way to make the payment of the rewards to each person manually. So the main motivation of this project is to automate this process and avoid to lose time sending the respective payments to each person

### Prerequisites

What things you need to install the software and how to install them

```
1. Cryptocurrency Wallet based on Bitcoin and compatible with MN.
2. RPC Server Configured.
3. Some destination addresses saved in the Wallet.
4. It is important that your computer has the correct hour according to the timezone
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
$ git clone https://github.com/cvaldezissc/mn-trustmatic.git
$ cd mn-trustmatic

#=====================================================================
# This is for you to introduce your own configurations, including connection to RPC
#=====================================================================
$ nano config/default.json

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
    
    
## Settings File Doc

Setting Key | Data Type | Default Value | Purpose |
--- | --- | --- | --- | 
`title` | string | "MN Trustmatic" | Be the title of the program name, when it is started
`coin` | string | "Paccoin"  | It is to have the name of the of the cryptocurrency to label 
`symbol` | string | "$PAC"  | The symbol of the cryptocurrency 
`storeType` | string | "file"  | Idicates where to save the log of transactions, where to save it `file` a single file, `database` for a MongoDB or `none` for not to save anywhere
`dbSettings` | object | []  | It is for stabilish the base connection to a Mongo DB in case of `storeType` property is set to database.
`rpcWallet` | object | []  | Credentials to connect this application to a wallet using RPC 
`walletPassphrase` | string | ""  | The Password for an encrypted wallet in case of it
`locale` | string | "locale/en.json"  | Path for a file which defines the strings 
`addresses` | object[] | [] |  They are the addresses to send their respective percentage of the masternode reward with the format: `name:"YOUR_NAME", percentage: 15`.



## Issues and new features

If you found a new issue please report it to [Project Issues](https://github.com/cvaldezissc/mn-trustmatic/issues/new). 

And if you want to add a new feature, please feel free to make a PR with this template [PR Template](https://github.com/cvaldezissc/mn-trustmatic/tree/master/docs/PR_TEMPLATE.md)




## Built With

* [Node JS](https://nodejs.org/download/release/v8.11.4/) - NodeJS v8.11.4
* [NPM](https://stackoverflow.com/a/44880273/6604217) - NPM v5.6.0
* [Mongo DB](https://docs.mongodb.com/manual/release-notes/4.0/?_ga=2.253379082.2041295965.1539547053-272326873.1539547053#download) - MongoDB v4.0.3



## To Do List
- [x] Generate config file readable in all the project.
- [x] Connect though RPC to a wallet
- [ ] Save transaction details in a file
- [ ] Save transaction details in MongoDB
- [ ] Save transaction details in a SQL DB (would need a script initializer)
- [ ] Add Locale translations
- [ ] Add stronge validations when getting the settings
- [ ] Add a wizard, when you run the program by the first time
- [ ] See how to obtain the addresses automatically from the wallet address book, not to dumpwallet command because it is dangerous to have the private key
- [ ] Adapt the best JS (ECMAScript 2017) practices to the project


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [Tags](https://github.com/cvaldezissc/mn-trustmatic/tags). 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.