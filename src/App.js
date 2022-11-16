import Web3 from "web3";
import Header from "./components/header";
import Allowances from "./components/allowances";
import React from "react";

//
import detectEthereumProvider from '@metamask/detect-provider';
const provider = await detectEthereumProvider();
if (provider) {
  console.log("provider" + provider);
  window.alert("provider" + provider);
  } else {
  console.log('Please install MetaMask!');
  window.alert("provider" + provider);
}
let web3 = provider;
//

//let web3 = new Web3(Web3.givenProvider);

function App() {
    return (
        <div>
            <Header />
            <Allowances web3={web3}/>
        </div>
    );
}

export default App;
