import React, { Component } from 'react';
import { getQuery, getApproveTransactions, getName, getEtherScanPage, getEtherTxPage } from "../helpers/helpers";
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
             
        this.init().then((obj) => {
            this.setState(obj);
            if(obj.txs.length !== 0) {
                document.getElementById("revokeAll").hidden = false;
                document.getElementById("loading").hidden = true;
                //window.alert("TRICK: your approval transactions are sorted chronologically, from newest (top) to oldest (bottom). Pay attention to those with an unlimited spending limit and check if there is a more recent one with a zero limit (revoked): if it doesn't exist for the same spender, then you can revoke the allowance by clicking on the revoke button and signing the transaction. After a few moments you will find a new transaction with zero spending limit which indicates that the spender contract will no longer have allowance for that token on your address.");
            } else {
                document.getElementById("loading").innerText = "Cool! No allowances to revoke for your address on this network.";
                document.getElementById("revokeAll").hidden = true;
            }
        }).catch((err) => {
            console.log(err);
            document.getElementById("loading").innerText = "Please connect to web3.";    
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
        //if chainId 16 
        //netname coston etc...
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
        if(this.state.txs !==  undefined && this.state.chainId !== undefined) {
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
