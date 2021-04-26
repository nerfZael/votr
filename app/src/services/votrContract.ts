import {AbiItem} from 'web3-utils';
import { abi } from '../contracts/Votr.json';


import web3 from "./web3";

const contractAddress = '0x303761AbE144ef47A19cCB436fb88eF3C09CfF8D';

const votrContract = new web3.eth.Contract(abi as unknown as AbiItem, contractAddress);

export default votrContract;