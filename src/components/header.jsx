import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';

//async function onInit() {
//  if (window.ethereum) {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     window.web3 = new Web3(window.ethereum);
//     const account = web3.eth.accounts;
//     //Get the current MetaMask selected/active wallet
//     const walletAddress = account.givenProvider.selectedAddress;
//     document.getElementById("addy").innerText = "connected address: " + account
//     console.log(`Wallet: ${walletAddress}`);
//  } else {
//   console.log("No wallet");
//  }

async function onInit() {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        var accountstart = account.substring(0,5);
	var accountend = account.substring(account.length - 5);
        document.getElementById("addy").innerText = "connected address: " + accountstart + "....." + accountend;
        window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload() 		
            // Time to reload your interface with accounts[0]!
           });
    }


    onInit();
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
		    <i>Please beware this is a <strong><a href="https://en.wikipedia.org/wiki/Software_release_life_cycle">BETA</a></strong> tool, use it at your own risk. Pay attention to <a href="https://en.wikipedia.org/wiki/Typosquatting" target="_blank">typosquatting</a>: the URL should be "evmallowance.com"</i>
                </div>
                <div className="jumbotron">
                <center><img src="../images/allowance.png"></img></center>
                    <div id="titles">
		    <h2><strong>SHOW AND REVOKE ALLOWANC&Xi;</strong></h2>
                    <h6>Flare, Songbird, Coston1, Coston2, Polygon, Binance Smart Chain, Arbitrium, Optimistic, Ethereum, Ropsten, Rinkeby, Kovan, Fantom.</h6>
		    
		    <h4 id="addy"></h4>
		    <h5 id="totcounts"></h5>
		    <h5 id="counts"></h5>
		    
                    <h4><a href="https://github.com/ftso-eu/sgb-allowance/blob/master/README.md" target="_blank">how it works | inf<img id="github" alt="GitHub" src="../images/github-o.png" width="13"></img></a></h4>
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
                   <hr height="0.2em" border-width="0" color="gray" background-color="gray"></hr>
                </div>
            </div>
        )
    }
}
export default header;
