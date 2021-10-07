// 橋と名札入りのドアの用意
import Web3 from 'web3';
require('dotenv').config();

let web3;

if (typeof window !== 'undefined' && window.ethereum !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(process.env.NODE_URL);
  web3 = new Web3(provider);
}

export default web3;
