This is a small application that interacts with smart contracts in the Arbitrum blockchain.

The purpose is to deposit WETH and rETH tokens in a vault in the blockchain. ETH is also required to pay for blockchain gas.

The user must have a Metamask wallet. Other type of wallet may work as well. The wallet must contain enough WETH, rETH, ETH tokens for the transactions.

To deposit the funds in the blockchain vault, the vault's smart contract is written. Some other information is gathered reading other smart contracts.

This application includes some basic styling and theming with a responsive layout. It also has some basic validations, as well as tests and mocks. The purpose is to show how to architect and integrate these features, rather than to offer a complete usage and coverage of them.

The technologies used are:

- React.js
- Next.js
- Typescript
- Tailwind
- Jest
- RainbowKit
- Wagmi
- Viem

## Install

This project was initially created with:

```bash
npm init @rainbow-me/rainbowkit@latest
```

Then Tailwind and themes were added with:

```bash
npm install -D tailwindcss postcss
npm install next-themes
npm install react-icons
```

To install the application locally, download the Git repository and run:

```bash
npm install
```

## Setup

1. Fork the Arbritrum One blockchain with a tool like Tenderly
1. Add the RPC to Metamask
1. Fund the Metamask wallet with ETH, WETH, rETH. The addresses for the custom tokens of WETH and rETH can be found in `addresses.ts`
1. Configure the virtual chain in `wagmi.ts`
1. If a different chain than the virtual one is to be used, `useBalances.ts` must be adapted

**Note:** An error like `Non-200 status code: '403'` may mean that the block limit of the virtual chain has been reached. Create another one, add it to Metamask, fund the tokens, and update `wagmi.ts`.

## Run

```bash
npm run dev
```

## Instructions

1. After running the application, go to [http://localhost:3000](http://localhost:3000) in a browser with a wallet in the Metamask plugin
1. Click the `Connect wallet` button in the application to connect to a Metamask wallet
1. The Metamask wallet information with the balance of the multiple tokens is shown in the application
1. The section to deposit funds in the is shown
1. A loading message is shown while the information for the vault tokens is being loaded from the smart contracts
1. The form to deposit funds is shown together with the ratio between tokens
1. Add `1` to the first token
1. The second token is updated automatically according to the ratio from the smart contract
1. An amount can also be added to the second token and the the first token is updated according to the ratio
1. Submit the form
1. The submitted token amounts are validated with the wallet balances
1. A indication for the current process step is shown in the application
1. Sign the necessary transactions on the Metamask wallet popup window
1. The successful process steps are shown at the bottom of the application with the regarding transaction hash
1. If all the steps are completed successfully, a successful message will be shown in the application
1. If there is any error during the process, the error description will be shown in the application and in the browser console

## Tests

Run all tests:

```bash
npm run test
```

Run one test file:

```bash
npm run test -- --testPathPattern=home.test
```

Run tests sequentially, if running tests in parallel causes errors:

```bash
npm run test -- --runInBand
```

## Improvements

This is a small application made as a demo of integrations of multiple technologies. As such, it doesn't offer a complete implementation of any technology or strategy. Many aspects should be improved to make it a production ready application.

Some key improvements are:

- Improve UI, styles, theme
- Improve form validation
- Improve error handling
- Organize styles in a common file rather than appying the same styles to individual elements
- Review Typescript types and make them more strict
- Review application re-renders
- Increase test coverage
- Add functional tests
- Use a `.env` file for the configuration of the blockchain used by the application
- Update the token ratio every few seconds or when a token amount is changed. Notify the user if there are any changes, and show when was the last update
