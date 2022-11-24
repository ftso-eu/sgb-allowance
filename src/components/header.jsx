import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';

async function onInit() {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        var accountstart = account.substring(0,5);
	var accountend = account.substring(account.length - 5);
        document.getElementById("addy").innerText = "connected address: " + accountstart + "....." + accountend;
        window.ethereum.on('accountsChanged', function (accounts) {
           // window.location.reload(); 		
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
		                        
		</div>
		</div>
                <br></br>
                <h4 id="loading" hidden>Loading, please wait...</h4>
                <div id="revokeAll">
		<div className="revokeAll">
		    <div className="container">
                        <div className="centered"><strong>TOKEN</strong></div>
                    </div>
                    <div className="container">
                       <div className="centered"><strong>SPENDER ADDRESS</strong></div>
                    </div>
                    <div className="container">
                        <div className="centered"><strong>ALLOWANCE</strong></div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <div className="centered"><a id="revokeLink" onClick={this.revokeAll}><strong>REVOKE ALL</strong></a></div>
                    </div>
                  </div>
                 </div>
            </div>
        )
    }
}
export default header;
