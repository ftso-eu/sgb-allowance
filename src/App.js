import Web3 from "web3";
import Header from "./components/header";
import Allowances from "./components/allowances";
import React from "react";
import generatedGitInfo from './generatedGitInfo.json';
//
//import detectEthereumProvider from '@metamask/detect-provider';
//const provider = await detectEthereumProvider();
//if (provider) {
//  console.log("provider" + provider);
//  window.alert("provider" + provider);
//  } else {
//  console.log('Please install MetaMask!');
// window.alert("provider" + provider);
//}
//let web3 = provider;
//

let web3 = new Web3(Web3.givenProvider);

function App() {
    return (
        <div>
            <Header />            
            <Allowances web3={web3}/> 
            <center>
            <div class="jumbotron">
            <br></br>
            <a href="https://github.com/ftso-eu/sgb-allowance/blob/master/README.md" target="_blank">how it works? get more inf<img id="github" alt="GitHub" src="../images/github-o.png" width="10px"></img></a>
            <br></br>
            <br></br>
            branch:{' '}
            <code>{generatedGitInfo.gitBranch}</code>           
            &nbsp;commit:{' '}
            <code>{generatedGitInfo.gitCommitHash}</code>
            </div>
            </center>
        </div>   
    );
}

export default App;
