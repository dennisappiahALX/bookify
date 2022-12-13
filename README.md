<div align="center">
  <p align="center">
    Bookify
    <br />
    <a href="https://github.com/dennisappiahALX/bookify"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="https://github.com/dennisappiahALX/bookify/blob/master/frontend/src/images/Bookify_deleted.png" alt="screenshot" width="" >

# What it does

Bookify is an online Book rental platform with seeks to solve of problem of difficult access to books due to high
costs. Bookify is an model application that serves as a library for all categories of books released on rental basis for small daily rental fee.

If you're interested in easy access to collection of books based on your preference , Bookify is the one stop place. With a simple interface, you can upload a book for others to rent market.

Key Features:

- App supports authentication and Authorization through CRUD operations
- Only Admin Users have delete authorization.
- Unauthenticated users do not have accesss to the platform till they are logged in.

# Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [React.js](https://reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)
- [ExpressJs](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDb](https://www.mongodb.com/home)

# Getting started

The project consist of the backend and also the front end.

### Prerequisites

- nodejs installed
- npm
- Hardhat

```
npm install npm@latest -g
npm install -g hardhat
```

### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```
git clone https://github.com/dennisappiahALX/bookify.git

cd nftproject

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```

<!-- ### Configuration

The chain ID should be 80001. If you have a localhost rpc set up, you may need to overwrite it.

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Infura.

```javascript
/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
const privateKey = "private key here";

const projectId = "xxx";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },

    matic: {
      url: "---matic url here---",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
};
``` -->

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

Distributed under the MIT License.

<!-- # Contact

- Mends Albert - https://twitter.com/mendalbert -->
