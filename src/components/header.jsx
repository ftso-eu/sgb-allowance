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
//     document.getElementById("addy").innerHTML = "connected address: " + account
//     console.log(`Wallet: ${walletAddress}`);
//  } else {
//   console.log("No wallet");
//  }

async function onInit() {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById("addy").innerHTML = "connected address: " + account
        window.ethereum.on('accountsChanged', function (accounts) {
            window.reload() 		
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
		    <i>Please beware this is a <strong><a href="https://en.wikipedia.org/wiki/Software_release_life_cycle">BETA</a></strong> tool in test / canary nets, use it at your own risk. Also, pay attention to <a href="https://en.wikipedia.org/wiki/Typosquatting" target="_blank">typosquatting</a> before signing transactions!</i>
                </div>
                <div className="jumbotron">
                    <div id="titles">
		    <h2>SHOW HISTORY AND REVOKE ALLOWANCES</h2>
		    <h3><a href="https://docs.flare.network/dev/reference/network-configs/" target="_blank">Songbird</a> | <a href="https://docs.flare.network/dev/reference/network-configs/" target="_blank">Coston1+2</a> | <a href="https://github.com/ftso-eu/sgb-allowance/blob/master/README.md" target="_blank">Inf<img id="github" alt="GitHub" src="https://www.kindpng.com/picc/m/613-6133946_github-awesome-logo-svg-hd-png-download.png" width="15"></img></a></h3>
                    <h5 id="addy"></h5>
		    <h5 id="counts"></h5>
		</div>
		</div>
                <h3 id="loading" hidden>Loading, please wait...</h3><br></br>
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
