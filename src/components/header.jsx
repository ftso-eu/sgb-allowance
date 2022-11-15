import React, { Component } from 'react';
import '../App.css';
import '../helpers/helpers.js';
import textBoxMedium from "../images/TEXTBOX_MEDIUM.png";
import revokeFullSpecial from "../images/REVOKE_Button_vers2.png";
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
                <div className="jumbotron">
                    <div id="titles">
		     <p><i>Please beware this is a <strong>Beta</strong> tool in test / canary nets, use it at your own risk.</i></p>
                     <hr></hr>
		    <h2>SHOW HISTORY AND REVOKE ALLOWANCES</h2>
                    <p>songbird | coston | coston2 | <a href="https://docs.flare.network/dev/reference/network-configs/" target="blank">info</a></p>
                    <p id="addy"></p>
		    <p id="counts"></p>
		</div>
		</div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
		<script> window.reload(); </script>
                <div id="revokeAll">
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">CONTRACT</div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">SPENDER</div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">ALLOWANCE</div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <img className="container" src={revokeFullSpecial} alt=""/>
                        <div className="centered-white"><a id="revokeLink" onClick={this.revokeAll}>Revoke All</a></div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered-white"><a onClick={() => { window.open("https://github.com/ftso-eu/sgb-allowance/issues") } }>Report issue</a></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default header;
