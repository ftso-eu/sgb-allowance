import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';

 async function onInit() {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
       var chain = window.ethereum.networkVersion;
        var accountstart = account.substring(0,5);
	var accountend = account.substring(account.length - 5);
        var netname = "undefined";

                if (chain === "14") {
        netname = "flare";
		}
                else if (chain === "1440001") {
        netname = "xrpl evm dev";
		}
		else if (chain === "114") {
        netname = "coston2";
		}
		else if (chain === "16") {
        netname = "coston";
		}
		else if (chain === "19") {
        netname = "songbird";
		}
		else if (chain === "1") {
        netname = "ethereum";
		}
		else if (chain === "3") {
        netname = "ropsten";
		}
		else if (chain === "4") {
        netname = "rinkeby";
		}
		else if (chain === "10") {
        netname = "optimistic";
		}
		else if (chain === "56") {
        netname = "binance chain";
		}
		else if (chain === "42161") {
        netname = "arbitrum";
		}
		else if (chain === "137") {
        netname = "polygon";
		}
		else if (chain === "250") {
        netname = "fantom";
		}
	    else if (chain === "43114") {
        netname = "avalanche";
		}
        else if (chain === "50") {
            netname = "xdc net";
            }
		else {
        netname = "network not supported";
		}		           
	document.getElementById("connected").innerText = accountstart + "..." + accountend + " (" + netname + ")";
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
                    <h5>Show & Revoke allowances on: Flare, Songbird, Coston1, Coston2, Xrpldev sidechain, XDC net, Avalanche, Polygon, Binance Chain, Arbitrum, Optimistic, Fantom, Ethereum, Ropsten, Rinkeby, Kovan.</h5>	    
		
		<center><button id="connected" class="buttonstyled2" onClick={() => window.location.reload(false)}>CONNECT</button></center>
		    <h5 id="totcounts"></h5>
		    <h5 id="counts"></h5>	
		</div>

		</div>
                <i><h4 id="loading" hidden><br></br>waiting for confirmation <img src="../images/loading.gif" width="30px"></img></h4></i>
		
		<script> window.reload(); </script>
                <div id="revokeAll">

                </div>
                <br></br>
                <i><h4 id="loading" hidden><br></br>waiting for confirmation <img src="../images/loading.gif" width="30px"></img></h4></i>
                <h6 id="partyimg" hidden></h6>
                <div className="revokeAll">
                 <div id="revokeAll">

                    <div className="container">
                        <div className="centered"><strong>token</strong></div>
                    </div>
                    <div className="container">
                       <div className="centered"><strong>spender</strong></div>
                    </div>
                    <div className="container">
                        <div className="centered"><strong>allowance</strong></div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <div className="centered"><strong>action</strong></div>
                    </div>
                  </div>
                </div>
<br></br>
            </div>
        )
    }
}
export default header;
