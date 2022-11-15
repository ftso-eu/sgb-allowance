let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
import React, { Component } from 'react';
import { getQuery, getApproveTransactions, getName, getEtherScanPage } from "../helpers/helpers";
import Allowance from "./allowance";

class allowances extends Component {

    state = {
        txs: undefined,
        account: undefined
    };

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        document.getElementById("loading").hidden = false;
        window.alert("Provider: " + Web3)
        this.init().then((obj) => {
            this.setState(obj);
            if(obj.txs.length !== 0) {
                document.getElementById("revokeAll").hidden = false;
                document.getElementById("loading").hidden = true;
            } else {
                document.getElementById("loading").innerText = "Hey, no allowances found on this account!";
                document.getElementById("revokeAll").hidden = true;
            }
        }).catch((err) => {
            console.log(err);
            window.alert("Provider: " + Web3 + " - " + err + " - Please report this bug using the links at the bottom of this site, thanks!");
            document.getElementById("loading").innerText = "Something went wrong. Please retry checking your network configuration or using a computer with chrome and metamask!";
            document.getElementById("revokeAll").hidden = true;
        });
    }

    async init() {
        let account;
        try {
            const accounts = await this.props.web3.eth.requestAccounts();
            account = accounts[0];
        } catch (e) {
            const accounts = await window.ethereum.enable();
            account = accounts[0];
        }
        const chainId = await this.props.web3.eth.getChainId();
        this.setState({ chainId: chainId });
        const query = getQuery(chainId, account);
        const txs = await getApproveTransactions(query);
        for(const index in txs) {
            txs[index].contractName = await getName(txs[index].contract);
            txs[index].approvedName = await getName(txs[index].approved);
        }
        return {
            txs: txs,
            account: account
        };
    }

    render() {
        let elements = "";
        if(this.state.txs !== undefined && this.state.chainId !== undefined) {
            const etherscanUrl = getEtherScanPage(this.state.chainId);
            elements = this.state.txs.map((tx) => {
                return <Allowance etherscanURL={etherscanUrl} tx={tx} web3={this.props.web3} id={tx.contract} account={this.state.account}/>
            });
        }

        return (
            <div>
                {elements}
            </div>
        )
    }
}

export default allowances;
