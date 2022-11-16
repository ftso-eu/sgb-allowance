import Web3 from "web3";
import Header from "./components/header";
import Allowances from "./components/allowances";
import React from "react";
//let web3 = new Web3(Web3.givenProvider);
let web3 = new Web3('https://songbird.towolabs.com/rpc');

function App() {
    return (
        <div>
            <Header />
            <Allowances web3={web3}/>
        </div>
    );
}

export default App;
