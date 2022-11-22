let Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider);

let request = require('superagent');
var k = 0;
var y = 0;
var netname = "this";
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const zeroAllowance = "0000000000000000000000000000000000000000000000000000000000000000";
const { ERC20ABI, ERC721ABI } = require("./ABI.js");


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

export function uniqByKeepFirst(a, key) {
    let seen = new Set();
    return a.filter(item => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}


export async function getApproveTransactions(query) {
    try {
        let data = await request.get(query);
        let approveTransactions = [];
        let dataObj1 = JSON.parse(data.text).result;
        let dataObj = uniqByKeepFirst(dataObj1, it => it.to)
        
        console.log("explorer api return ", dataObj1);
        console.log("explorer api filtered ", dataObj);
        for(let tx of dataObj) {
            if(tx.input.includes(approvalHash)) {
               k++;        
               var a = new Date(dataObj[k].timeStamp * 1000);
               var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
               var year = a.getFullYear();
               var month = months[a.getMonth()];
               var date = a.getDate();
               var hour = a.getHours();
               var min = a.getMinutes();
               var sec = a.getSeconds();
               var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                

                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                approveObj.timestamp = "#" + k + " - timestamp: " + dataObj[k].timeStamp;        
                let allowance = tx.input.substring(74);
                        
                
                
                 if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "unlimited (" + time + ")";
                } else if (allowance.includes(zeroAllowance)) {
                    approveObj.allowance = "revoked " + time; 
                    approveObj.allowanceUnEdited = allowance;
                }
                 else
                {
                    approveObj.allowance = "limited (" + time + ")";
                    approveObj.allowanceUnEdited = allowance;
                }
              
                          
                if (!allowance.includes(zeroAllowance)) { 
                     y++
                     approveTransactions.push(approveObj);
                     console.log("DATE", "#" + k + " - Date: " + time);
                     console.log("UNIX TIMESTAMP", "timestamp: " + dataObj[k].timeStamp);
                     console.log("HASH", dataObj[k].hash);
                     console.log("ALLOWANCE: ", allowance);
                     console.log("------------------------");
                     
                    }
                  
                }
            
        }      
        document.getElementById("totcounts").innerHTML = "total approval transactions: " + k;
        document.getElementById("counts").innerHTML = "allowances to revoke: " + y;
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
