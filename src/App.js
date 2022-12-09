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
            <br></br>
            <br></br>
            <iframe src="https://widgets.flaremetrics.io/data-provider-metrics/?address=0x010a16c53f33e4d93892f00897965578b55a8cfc&network=songbird&header=true&dark=true&transparent=false" frameborder="0" scrolling="no"  height="450px" width="96%"> </iframe>
            </div>
            </center>
        </div>   
    );
}

export default App;
