import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';

// this returns the provider, or null if it wasn't detected
const provider = await detectEthereumProvider();

if (provider) {
  startApp(provider); // Initialize your app
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

const chainId = await ethereum.request({ method: 'eth_chainId' });
handleChainChanged(chainId);

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.
document.getElementById('connectButton', connect);

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}

// async function onInit() {
// const Web3 = require("web3");
// const ethEnabled = async () => {
//   if (window.ethereum) {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const account = accounts[0];
//         var accountstart = account.substring(0,5);
// 	var accountend = account.substring(account.length - 5);
//         document.getElementById("addy").innerText = "connected address: " + accountstart + "....." + accountend;
//     window.web3 = new Web3(window.ethereum);
//     return true;
//   }
//   return false;
// }
// }

// onInit();

class header extends Component {

    revokeAll = () => {
        let buttons = document.getElementsByName('revoke');
        for(let button of buttons) {
            button.click();
        }
    }

    render() {
        return (
            <div>
		<div id="bar">
		    <i>Please beware this is a <strong><a href="https://en.wikipedia.org/wiki/Software_release_life_cycle">BETA</a></strong> tool in test / canary nets, use it at your own risk. Also, pay attention to <a href="https://en.wikipedia.org/wiki/Typosquatting" target="_blank">typosquatting</a> before signing transactions!</i>
                </div>
                <div className="jumbotron">
                <center><img src="../images/allowance.png"></img></center>
                    <div id="titles">
                    <button onClick={() => window.location.reload(false)}>reload</button>
		    <h2><strong>SHOW AND REVOKE ALLOWANC&Xi;</strong></h2>
                    <h6>Flare, Songbird, Coston1, Coston2, Polygon, Binance Smart Chain, Arbitrum, Optimistic, Ethereum, Ropsten, Rinkeby, Kovan, Fantom.</h6>
		    <h3><a href="https://github.com/ftso-eu/sgb-allowance/blob/master/README.md" target="_blank">inf<img id="github" alt="GitHub" src="../images/github-o.png" width="15"></img></a></h3>
                    <h4 id="addy"></h4>
		    <h5 id="totcounts"></h5>
		    <h5 id="counts"></h5>
		</div>
		</div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
		<h3 id="partyimg" hidden></h3>
		<script> window.reload(); </script>
                <div id="revokeAll">
                    <div className="container">
                        <div className="centered"><strong>CONTRACT</strong></div>
                    </div>
                    <div className="container">
                       <div className="centered"><strong>SPENDER</strong></div>
                    </div>
                    <div className="container">
                        <div className="centered"><strong>ALLOWANCE</strong></div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <div className="centered-white"><a id="revokeLink" onClick={this.revokeAll}><strong>REVOKE ALL</strong></a></div>
                    </div>
                   <center><hr height="0.2em" border-width="0" color="gray" background-color="gray" width="96%"></hr></center>
                </div>
            </div>
        )
    }
}
export default header;
