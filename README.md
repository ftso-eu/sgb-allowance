# sgb-allowance
Show history and revoke (a single or all) Flare Network (test/canary nets) allowances for the connected address.

Web Dapp: https://sgb-allowance.ftso.eu 

## How it works
This tool works by searching all your transactions on the Flare blockchains to find approval transactions: these transactions are the ones that set allowance spend limits to other addresses for a token owned in yours.

Transactions are filterd for spender addresses in chronological order and only the newest with a spend limit > 0 are shown and can be revoked.
