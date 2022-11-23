# evmallowance
Show history and revoke allowances for the connected address on the connnected networks (you can pull request to support more):

Flare, Songbird, Coston1, Coston2, Polygon, Binance Smart Chain, Arbitrium, Optimistic, Ethereum, Ropsten, Rinkeby, Kovan.

Tested with Metamask, Bifrost, D'Cent.

Web Dapp: https://evmallowance.com 

## How it works
This tool works by searching all "approve transactions" for the address in the connected network explorer;

Transactions are then filterd for spender addresses in chronological order;

The newest for unique contracts with a spend limit > 0 are shown and can be revoked pushing the "revoke" button and signing a new "approve transaction" that set the limit back to zero.
