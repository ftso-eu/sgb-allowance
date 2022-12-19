
import { onInit } from "../components/header.jsx";
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


export function getQuery(chainId, address) {
    switch (chainId) {
        case 1440001:          
           return "https://evm-sidechain.peersyst.tech/api?module=account&action=txlist&address=" + address;
        case 14:          
           return "https://flare-explorer.flare.network/api?module=account&action=txlist&address=" + address;
        case 114:          
           return "https://coston2-explorer.flare.network/api?module=account&action=txlist&address=" + address;         
        case 16:          
            return "https://coston-explorer.flare.network/api?module=account&action=txlist&address=" + address;         
        case 19:        
            return "https://songbird-explorer.flare.network/api?module=account&action=txlist&address=" + address;          
        case 1:
            return "https://api.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 3:
            return "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 4:
            return "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 10:
            return "https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 42:
            return "https://api-kovan.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 56:
            return "https://api.bscscan.com/api?module=account&action=txlist&address=" + address;
        case 42161:
            return "https://api.arbiscan.io/api?module=account&action=txlist&address=" + address;
        case 137:
            return "https://api.polygonscan.com/api?module=account&action=txlist&address=" + address;
        case 250:          
           return "https://api.ftmscan.com/api?module=account&action=txlist&address=" + address;
        case 43114:          
           return "https://api-beta.avascan.info/v2/network/mainnet/evm/43114/address/" + address + "/transactions";
        case 50:          
           return "https://xdc.blocksscan.io/api/txs/listByAccount/" + address;
        default:
            return "";           
    }
}

export function getEtherScanPage(chainId) {
    switch (chainId) {
        case 1440001:
            return "https://evm-sidechain.xrpl.org/address/";
        case 14:
            return "https://flare-explorer.flare.network/address/";
        case 114:
            return "https://coston2-explorer.flare.network/address/";
        case 16:
            return "https://coston-explorer.flare.network/address/";
        case 19:
            return "https://songbird-explorer.flare.network/address/";
        case 1:
            return "https://etherscan.io/address/";
        case 3:
            return "https://ropsten.etherscan.io/address/";
        case 4:
            return "https://rinkeby.etherscan.io/address/";
        case 10:
            return "https://optimistic.etherscan.io/address/";
        case 42:
            return "https://kovan.etherscan.io/address/";
        case 56:
            return "https://bscscan.com/address/";
        case 42161:
            return "https://arbiscan.io/address/";
        case 137:
            return "https://polygonscan.com/address/";
        case 250:
            return "https://ftmscan.com/address/";
        case 43114:
            return "https://avascan.info/blockchain/c/address/";
        case 50:
                return "https://xdc.blocksscan.io/address/";
        default:
            return "";
            
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
          if (chain === "50") {
            let dataObj1 = JSON.parse(data.text).items;
            }
            else {
            let dataObj1 = JSON.parse(data.text).result;
            }
          dataObj1.sort(function(xx, yy){
          return yy.timeStamp - xx.timeStamp;
          })
    //    console.log("explorer api return ", dataObj1);     
        
        let dataObj = uniqByKeepFirst(dataObj1, it => it.input.substring(34, 74));
    //    console.log("explorer api filtered ", dataObj);

        for(let tx of dataObj) {
            if(tx.input.includes(approvalHash)) {
               k++;        
               var a = new Date(tx.timeStamp * 1000);
               var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
               var year = a.getFullYear();
               var month = months[a.getMonth()];
               var date = a.getDate();
               var hour = a.getHours();
               var min = a.getMinutes();
               var sec = a.getSeconds();
               var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min;
                

                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));  
                approveObj.timestamp = "#" + k + " - timestamp: " + dataObj[k].timeStamp;
                let allowance = tx.input.substring(74);
                
        
                        
                
                
                 if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "unlimited, approved on " + time;
                    
                } else if (allowance.includes(zeroAllowance)) {
                    approveObj.allowance = "revoked on " + time; 
                    approveObj.allowanceUnEdited = allowance;
                }
                 else
                {
                    approveObj.allowance = "limited, approved on " + time;
                    approveObj.allowanceUnEdited = allowance;
                }
              
                          
                if (!allowance.includes(zeroAllowance)) { 
                     y++
                     approveTransactions.push(approveObj);
                     console.log("DATE", "#" + k + " - Date: " + time);
                     console.log("UNIX TIMESTAMP", "timestamp: " + tx.timeStamp);
                     console.log("HASH", tx.hash);
                     console.log("ALLOWANCE: ", allowance);
                     console.log("------------------------");
                     
                    }
                  
                }
            
        }      
        document.getElementById("totcounts").innerHTML = "historically approved spenders: " + k;
        document.getElementById("counts").innerHTML = "allowances not revoked: " + y;
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

//export async function getRouter(spender) {
//    try {
//        let contract = new web3.eth.Contract(ERC20ABI, spender);
//        return await contract.methods.name().call();
//    } catch(e) {
//        // name not found, just use contract address
//        console.error(e);
//        return spender;
//    }
//}

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
