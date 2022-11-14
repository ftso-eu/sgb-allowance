# sgb-allowance
Find & revoke token allowances.

IMPORTANT: You will keep watching your allowance history, also after revoking them (i.e. setting the spend limit = 0).

Web Dapp: https://sgb-allowance.ftso.eu 

## How it works
This tool works by searching all your transactions on the Flare blockchains to find the approval transactions; 
This tool shows the  approval transactions in chronological order from the most recent to the oldest.
You can check if the latest one is not zero and set it to zero clicking on "Revoke".
You can also add the spender address to the tool to "map" it.

## Add a dapp to the list
Fork this repo and add your dapp to the list [here](https://github.com/ftso-eu/sgb-allowance/blob/master/src/helpers/dapps.js) or submit an [issue](https://github.com/ftso-eu/sgb-allowance/issues).

## Credits
This is a fork of https://github.com/James-Sangalli/eth-allowance
