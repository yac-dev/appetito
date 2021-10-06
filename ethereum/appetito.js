import web3 from './web3';
import Appetito from './build/Appetito.json';

const instance = new web3.eth.Contract(Appetito.abi, '0x5e2960655Ab5bE255c5E63A3F81Bb8700b62C156');

export default instance;
// 準備はできたはず。。。
