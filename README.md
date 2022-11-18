# sgb-allowance
Show history and revoke (a single or all) Flare Network (test/canary nets) allowances for the connected address.

Web Dapp: https://sgb-allowance.ftso.eu 

## How it works
This tool works by searching all your transactions on the Flare blockchains to find approval transactions: these transactions are the ones that set allowance spend limits to other addresses for a token owned in yours.

Transactions are listed in chronological order from the most recent to the oldest.

You can check if the latest one for a token and a spender is not zero (limited or unlimited) and set it back to zero clicking on "revoke this".

## Credits
This is a fork of https://github.com/James-Sangalli/eth-allowance
