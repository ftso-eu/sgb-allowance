import Web3 from "web3";
import Header from "./components/header";
import Allowances from "./components/allowances";
import React from "react";
const web3 = new Web3(web3.providers.HttpProvider("https://songbird-api.flare.network/ext/C/rpc"));

function App() {
    return (
        <div>
            <Header />
            <Allowances web3={web3}/>
        </div>
    );
}

export default App;
