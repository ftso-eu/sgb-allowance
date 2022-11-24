import React, { Component } from 'react';
import { is721 } from "../helpers/helpers";
import dapps from "../helpers/dapps";
import { ERC20ABI } from "../helpers/ABI";

class allowance extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.setRevokeClick = this.setRevokeClick.bind(this);
        this.dappURL= this.dappURL.bind(this);
    }

    dappURL() {
        if(dapps[this.props.tx.contractName.toLowerCase()] !== undefined) {
            return dapps[this.props.tx.contractName.toLowerCase()];
        }
        const dappsKeys = Object.keys(dapps);
        for(let key of dappsKeys) {
            if(this.props.tx.contractName.toLowerCase().includes(key)) {
                return dapps[key];
            }
        }

        return "";
    }

    setRevokeClick() {
        // set the contract and make an approve transaction with a zero allowance
        const { web3 } = this.props;
        const contract = new web3.eth.Contract(ERC20ABI, this.props.tx.contract);
        document.getElementById("loading").hidden = false;
        
        is721(contract, this.props.tx.allowanceUnEdited).then((result) => {
            if(result) {
                //revoke erc721 by nulling the address
                contract.methods.approve(0, this.props.tx.allowanceUnEdited).send({ from: this.props.account }).then((receipt) => {
                    console.log("revoked: " + JSON.stringify(receipt));
                    window.location.reload();
                }).catch((err) => {
                    console.log(err)
                    console.log("failed: " + JSON.stringify(err));
                    window.alert("Ooopsi! Something went wrong, press ok to reload the app");
                    window.location.reload();
                });
            } else {
                // revoke erc20 by nulling approval amount
                contract.methods.approve(this.props.tx.approved, 0).send({ from: this.props.account }).then((receipt) => {
                    console.log("revoked: " + JSON.stringify(receipt));
                    window.location.reload();
                }).catch((err) => {
                    console.log(err)
                    console.log("failed: " + JSON.stringify(err));
                    window.alert("Ooopsi! Something went wrong, press ok to reload the app");
                    window.location.reload();
                });
            }
        });
    }

    getDappButton() {
        const dappUrl = this.dappURL();
        if(dappUrl !== "") {
            return <div className="container">
                <div className="centered-white"><a onClick={() => { window.open(dappUrl) } }>visit spender website</a></div>
            </div>;
        } else {
            return <div className="container">
                <div className="centered-white"><a onClick={() => { window.open("https://github.com/ftso-eu/sgb-allowance/blob/master/src/helpers/dapps.js"); } }>add spender name</a></div>
            </div>;
        }
    }

    truncateName(name) {
        if(name.length > 20) {
            return name.substring(0, 5) + '.....' + name.substring(name.length - 5)  
        }
        return name;
    }

    render() {
        return (
            <div>
                <div className="allowance">
                    <div className="container">
                        <div className="centered"><a href={this.props.etherscanURL + this.props.tx.contract}>{this.truncateName(this.props.tx.contractName)}</a></div>
                    </div>

                    <div className="container">
                        <div className="centered"><a href={this.props.etherscanURL + this.props.tx.approved}>{this.truncateName(this.props.tx.approvedName)}</a></div>
                    </div>

                    <div className="container">
                        <div className="centered">{this.props.tx.allowance}</div>
                    </div>

                    <div className="container">
                        <div className="centered-white"><a name="revoke" id="revokeLink" onClick={this.setRevokeClick}>revoke this</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default allowance;
