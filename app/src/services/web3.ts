import Web3 from 'web3';

declare let window: any;
let web3: Web3;

web3 = new Web3(window.ethereum);

export default web3;