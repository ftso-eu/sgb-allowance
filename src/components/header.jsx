import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';
async function onInit() {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById("addy").innerHTML = "connected address: " + account
        window.ethereum.on('accountsChanged', function (accounts) {
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
                    <h3><a href="https://github.com/ftso-eu/sgb-allowance/blob/master/README.md" target="_blank"><img id="github" alt="GitHub" src="images/github.png" width="25"></img></a> | <a href="https://docs.flare.network/dev/reference/network-configs/" target="_blank">Songbird</a> | <a href="https://docs.flare.network/dev/reference/network-configs/" target="_blank">Coston 1 and 2</a></h3>
                    <h5 id="addy"></h5>
		    <h5 id="counts"></h5>
		</div>
		</div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
		<script> window.reload(); </script>
                <div id="revokeAll">
                    <div className="container">
                        <div className="centered">CONTRACT</div>
                    </div>
                    <div className="container">
                       <div className="centered">SPENDER</div>
                    </div>
                    <div className="container">
                        <div className="centered">ALLOWANCE</div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <div className="centered-white"><a id="revokeLink" onClick={this.revokeAll}>REVOKE ALL</a></div>
                    </div>
                    
                    <hr></hr>
                </div>
            </div>
        )
    }
}
export default header;
