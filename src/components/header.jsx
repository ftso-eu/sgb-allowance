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
        var chain = window.ethereum.networkVersion;
        var accountstart = account.substring(0,5);
	var accountend = account.substring(account.length - 5);
        var netname = "undefined";
                if (chain == "14") {
        netname = "flare";
		}
		else if (chain == "114") {
        netname = "coston2";
		}
		else if (chain == "16") {
        netname = "coston";
		}
		else if (chain == "19") {
        netname = "songbird";
		}
		else if (chain == "1") {
        netname = "ethereum";
		}
		else if (chain == "3") {
        netname = "ropsten";
		}
		else if (chain == "4") {
        netname = "rinkeby";
		}
		else if (chain == "10") {
        netname = "optimistic";
		}
		else if (chain == "56") {
        netname = "binance chain";
		}
		else if (chain == "42161") {
        netname = "arbitrum";
		}
		else if (chain == "137") {
        netname = "polygon";
		}
		else if (chain == "250") {
        netname = "fantom";
		}
		else {
        netname = "network not supported";
		}
		
        
        document.getElementById("addy").innerText = "address " + accountstart + "..." + accountend + " connected to " +  netname;
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
		    <i>Please beware this is a <strong><a href="https://en.wikipedia.org/wiki/Software_release_life_cycle">BETA</a></strong> tool, use it at your own risk. Pay attention to <strong><a href="https://en.wikipedia.org/wiki/Typosquatting" target="_blank">typosquatting</a></strong>: your URL should be "evmallowance.com"</i>
                </div>
                <div className="jumbotron">
                    <div id="titles">
		    <h1><strong>&Xi;VMALLOWANC&Xi;</strong></h1>    
                    <h5>Show & Revoke allowances on: Flare, Songbird, Coston1, Coston2, Polygon, Binance Smart Chain, Arbitrum, Optimistic, Ethereum, Ropsten, Rinkeby, Kovan, Fantom.</h5>
		    
		<h4 id="addy"></h4>
		<center><button background-color="#0D1A5D" color="#ffcc33" onClick={() => window.location.reload(false)}>reload/reconnect</button></center>
		    <h5 id="totcounts"></h5>
		    <h5 id="counts"></h5>
		
		</div>
		</div>
                <i><h4 id="loading" hidden><br></br>waiting for confirmation <img src="https://media.tenor.com/guhB4PpjrmUAAAAC/loading-loading-gif.gif" width="30px"></img></h4></i>
                <h6 id="partyimg" hidden></h6>
                <div className="revokeAll">
                 <br></br>
                 <div id="revokeAll">
                    <div className="container">
                        <div className="centered"><strong>contract</strong></div>
                    </div>
                    <div className="container">
                       <div className="centered"><strong>spender</strong></div>
                    </div>
                    <div className="container">
                        <div className="centered"><strong>allowance</strong></div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <div className="centered"><strong>actions</strong></div>
                    </div>
                   <br></br>
                 </div>
<br></br>
                </div>
            </div>
        )
    }
}
export default header;
