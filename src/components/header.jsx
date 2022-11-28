import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';


const Web3 = require("web3");
const ethEnabled = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        var accountstart = account.substring(0,5);
	var accountend = account.substring(account.length - 5);
        document.getElementById("addy").innerText = "connected address: " + accountstart + "....." + accountend;
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}


//async function onInit() {
//        await window.ethereum.enable();
//        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//        const account = accounts[0];
//        var accountstart = account.substring(0,5);
	//var accountend = account.substring(account.length - 5);
        //document.getElementById("addy").innerText = "connected address: " + accountstart + "....." + accountend;
        //window.ethereum.on('accountsChanged', function (accounts) {
         //   window.location.reload() 		
            // Time to reload your interface with accounts[0]!
        //   });
  //  }


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
                <center><img src="../images/allowance.png"></img></center>
                    <div id="titles">
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
