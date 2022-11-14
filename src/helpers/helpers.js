let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const zeroAllowance = "0";
const { ERC20ABI, ERC721ABI } = require("./ABI.js");

export function getQuery(chainId, address) {
    switch (chainId) {
        case 114:
            return "https://coston2-explorer.flare.network/api?module=account&action=txlist&address=" + address;
        case 16:
            return "https://coston-explorer.flare.network/api?module=account&action=txlist&address=" + address;
        default:
            return "";
    }
}

export function getEtherScanPage(chainId) {
    switch (chainId) {
        case 114:
            return "https://coston2-explorer.flare.network/address/";
        case 16:
            return "https://coston-explorer.flare.network/address/";
        default:
            return "";
    }
}

export async function getApproveTransactions(query) {
    try {
        let data = await request.get(query);
        let approveTransactions = [];
        let dataObj = JSON.parse(data.text).result;
        console.log("explorer api return ", dataObj);
     //   var i=0;
     //  for (i=0; i < dataObj.length; i++){
     //   document.getElementById("from").innerHTML=dataObj[i].from 
     //   document.getElementById("to").innerHTML=dataObj[i].to
     //   document.getElementById("value").innerHTML=dataObj[i].value
     //   document.getElementById("hash").innerHTML=dataObj[i].hash
     //   }
     
    let tableFromJson = () => {
    let col = [];
    for (let i = 0; i < dataObj.length; i++) {
      for (let key in dataObj[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    // Create table.
    const table = document.createElement("table");
    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.
    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");      // table header.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
    // add json data to the table as rows.
    for (let i = 0; i < dataObj.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = dataObj[i][col[j]];
      }
    }
    // Now, add the newly created table with json data, to a container.
    document.getElementById("showData");
  }
        
        for(let tx of dataObj) {
            if(tx.input.includes(approvalHash)) {
                console.log("found approve transaction")
                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                let allowance = tx.input.substring(74);
                if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "unlimited";
                } else if(allowance.includes(zeroAllowance)) {
                    approveObj.allowance = "zero";
                   } else
                {
                    approveObj.allowance = "some";
                    approveObj.allowanceUnEdited = allowance;
                }
                if(parseInt(allowance, 16) !== 0) {
                    approveTransactions.push(approveObj);
                } else {
                    // TODO clean up
                    // Remove all previous additions of this approval transaction as it is now cleared up
                    approveTransactions = approveTransactions.filter((val) => {
                        return !(val.approved === approveObj.approved && val.contract === val.contract);
                    });
                }
            }
        }
        return approveTransactions;
    } catch (e) {
        throw e;
    }
}

export async function getName(contractAddress) {
    try {
        let contract = new web3.eth.Contract(ERC20ABI, contractAddress);
        return await contract.methods.name().call();
    } catch(e) {
        // name not found, just use contract address
        console.error(e);
        return contractAddress;
    }
}

export async function is721(contractAddress, tokenId) {
    let contract = new web3.eth.Contract(ERC721ABI, contractAddress);
    try {
        const _ = await contract.methods.ownerOf(tokenId).call();
        return true; // if this call passes, it must be ERC721
    } catch (e) {
        // method doesn't exist, can't be 721
        return false;
    }
}
