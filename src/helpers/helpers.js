let Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider);

let request = require('superagent');
var k = 0;
var netname = "this";
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
            
            return "https://coston2-explorer.flare.network/";
            
        case 16:
            
            return "https://coston-explorer.flare.network/";
            
        case 19:
            
            return "https://songbird-explorer.flare.network/";
            
        default:
            
            return "https://songbird-explorer.flare.network/";
            
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
                k++;
                //console.log("found " + k + " approve transaction")
                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                let allowance = tx.input.substring(74);
                if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "unlimited";
                } else if (allowance.includes(zeroAllowance)) {
                    approveObj.allowance = "<a href=" + getEtherScanPage + tx.hash + ">already revoked</a>";
                    approveObj.allowanceUnEdited = allowance;
                }
                 else
                {
                    approveObj.allowance = "limited";
                    approveObj.allowanceUnEdited = allowance;
                }
                approveTransactions.push(approveObj);
            }
        }
        console.log("total approval tx counts " + k);
        
        document.getElementById("counts").innerHTML = "Approve transactions found on " + netname + " network: " + k;
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
