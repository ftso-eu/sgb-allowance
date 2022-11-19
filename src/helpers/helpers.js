let Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider);

let request = require('superagent');
var k = 0;
var netname = "this";
//const ethertxUrl = getEtherTxPage(this.state.chainId);
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const zeroAllowance = "0";
const { ERC20ABI, ERC721ABI } = require("./ABI.js");

// export function getTxUrl(chainId, hash) {
//     switch (chainId) {
//        case 114:       
//             return "https://coston2-explorer.flare.network/tx/" + hash;       
//         case 16:  
//             return "https://coston-explorer.flare.network/tx/" + hash;     
//         case 19:
//             "https://Songbird-explorer.flare.network/tx/" + hash;      
//         default:
//             "https://Songbird-explorer.flare.network/tx/" + hash;         
//     }
// }

// export function getNetName(chainId) {
//    switch (chainId) {
//        case 114:
//            return "coston2";        
//        case 16:
//            return "coston";         
//        case 19:
//            return "Songbird";         
//        default:
//            return "Songbird";         
//    }
//}

export function getQuery(chainId, address) {
    switch (chainId) {
        case 114:          
           return "https://coston2-explorer.flare.network/api?module=account&action=txlist&address=" + address;         
        case 16:          
            return "https://coston-explorer.flare.network/api?module=account&action=txlist&address=" + address;         
        case 19:        
            return "https://songbird-explorer.flare.network/api?module=account&action=txlist&address=" + address;          
       default:          
           return "https://songbird-explorer.flare.network/api?module=account&action=txlist&address=" + address;           
    }
}

export function getEtherScanPage(chainId) {
    switch (chainId) {
        case 114:
            
            return "https://coston2-explorer.flare.network/address/";
            
        case 16:
            
            return "https://coston-explorer.flare.network/address/";
            
        case 19:
            
            return "https://songbird-explorer.flare.network/address/";
            
        default:
            
            return "https://songbird-explorer.flare.network/address/";
            
    }
}

export function getEtherTxPage(chainId) {
    switch (chainId) {
        case 114:
            
            return "https://coston2-explorer.flare.network/tx/";
            
        case 16:
            
            return "https://coston-explorer.flare.network/tx/";
            
        case 19:
            
            return "https://songbird-explorer.flare.network/tx/";
            
        default:
            
            return "https://songbird-explorer.flare.network/tx/";
            
    }
}

export async function getApproveTransactions(query) {
    try {
        let data = await request.get(query);
        let approveTransactions = [];
        let dataObj = JSON.parse(data.text).result;
        console.log("explorer api return ", dataObj);
        
        for(let tx of dataObj) {
            if(tx.input.includes(approvalHash)) {       
               var a = new Date(dataObj[k].timeStamp * 1000);
               var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
               var year = a.getFullYear();
               var month = months[a.getMonth()];
               var date = a.getDate();
               var hour = a.getHours();
               var min = a.getMinutes();
               var sec = a.getSeconds();
               var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                console.log("DATE", "#" + k + " - Date: " + time);
                console.log("UNIX TIMESTAMP", "timestamp: " + dataObj[k].timeStamp);
                console.log("explorer api return LIMIT SET", dataObj[k].value);
                console.log("HASH", dataObj[k].hash);
                k++;
                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                approveObj.timestamp = "#" + k + " - timestamp: " + dataObj[k].timeStamp;
                approveObj.hash = "allowance value : " + dataObj[k].value;
                
                let allowance = tx.input.substring(74);
                if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "set unlimited value on " + time;
                } else if (allowance.includes(zeroAllowance)) {
                    approveObj.allowance = "revoked on " + time; 
                    approveObj.allowanceUnEdited = allowance;
                }
                 else
                {
                    approveObj.allowance = "se limited value on " + time;
                    approveObj.allowanceUnEdited = allowance;
                }
                approveTransactions.push(approveObj);
                }
        }
        console.log("total approval tx counts " + k);
        document.getElementById("counts").innerHTML = "total approve transactions found: " + k;
        return approveTransactions;
    } catch (e) {
        throw e;
    }
}

export async function getName(contractAddress) {
    try {
        let contract = new web3.eth.Contract(ERC20ABI, contractAddress);
        return await contract.methods.symbol().call();
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
