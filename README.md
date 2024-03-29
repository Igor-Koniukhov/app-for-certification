app-for-certification
==================

- This [React] app was initialized with [create-near-app].
- The application for passing tests or exams and in a case, you succeed you get certificate which you could print in PDF
  format or mint and get your certificate with information about your results as NFT.

Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Exploring The Code
==================

1. The "backend" code lives in the `/contract` folder. See the README there for
   more info.
2. The frontend code lives in the `/src` folder. `/src/index.html` is a great
   place to start exploring. Note that it loads in `/src/index.js`, where you
   can learn how the frontend connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and the smart
   contract. See `contract/README` for info about how it's tested. The frontend
   code gets tested with [jest]. You can run both of these at once with `yarn
   run test`.

Deploy
======

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart
contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's
how.


Step 0: Install near-cli (optional)
-------------------------------------

[near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the
local `node_modules` folder when you ran `yarn install`, but for best ergonomics you may want to install it globally:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)


Step 1: Create an account for the contract
------------------------------------------

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such
as `your-name.testnet`, you can deploy your contract to `app-for-certification.your-name.testnet`. Assuming you've
already created an account on [NEAR Wallet], here's how to create `app-for-certification.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

   near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

   near create-account app-for-certification.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet

On Windows, if you're seeing an error containing `EPERM` it may be related to spaces in your path. Please
see [this issue](https://github.com/zkat/npx/issues/209) for more details.


[React]: https://reactjs.org/

[create-near-app]: https://github.com/near/create-near-app

[Node.js]: https://nodejs.org/en/download/package-manager/

[jest]: https://jestjs.io/

[NEAR accounts]: https://docs.near.org/docs/concepts/account

[NEAR Wallet]: https://wallet.testnet.near.org/

[near-cli]: https://github.com/near/near-cli

[gh-pages]: https://github.com/tschaub/gh-pages
