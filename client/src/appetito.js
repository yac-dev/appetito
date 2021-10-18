import web3 from './web3';
// import deployedInfo from '../../ethereum/deploy';
// import Dashboard from 'app-b-dashboard/container';

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'approveClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x46e30135',
  },
  {
    inputs: [
      { internalType: 'string', name: 'claimerName', type: 'string' },
      { internalType: 'string', name: 'dreamJob', type: 'string' },
      { internalType: 'string', name: 'materialTitle', type: 'string' },
      { internalType: 'string', name: 'urlSource', type: 'string' },
      { internalType: 'string', name: 'purpose', type: 'string' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      {
        internalType: 'address',
        name: 'recipientAddress',
        type: 'address',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x9efb693b',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'claims',
    outputs: [
      { internalType: 'string', name: 'claimerName', type: 'string' },
      { internalType: 'string', name: 'dreamJob', type: 'string' },
      { internalType: 'string', name: 'materialTitle', type: 'string' },
      { internalType: 'string', name: 'purpose', type: 'string' },
      { internalType: 'string', name: 'urlSource', type: 'string' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      {
        internalType: 'address',
        name: 'claimerAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipientAddress',
        type: 'address',
      },
      { internalType: 'bool', name: 'done', type: 'bool' },
      {
        internalType: 'uint256',
        name: 'approvedCounts',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xa888c2cd',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'contributorName',
        type: 'string',
      },
    ],
    name: 'contribute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0x5c43217b',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'contributors',
    outputs: [
      {
        internalType: 'string',
        name: 'contributorName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'contributorAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x3cb5d100',
  },
  {
    inputs: [],
    name: 'getContributors',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'contributorName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'contributorAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Appetito.ContributorType[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xaf157c19',
  },
  {
    inputs: [],
    name: 'getMessages',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
        ],
        internalType: 'struct Appetito.MessageType[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x5ff6cbf3',
  },
  {
    inputs: [{ internalType: 'string', name: 'description', type: 'string' }],
    name: 'makeMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x14d5b247',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'messages',
    outputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'string', name: 'description', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x0d80fefd',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x8da5cb5b',
  },
  {
    inputs: [],
    name: 'population',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x78880f4a',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'startStudy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0xa5f7542a',
  },
];

const address = '0x63A7688AAa7D2f0F3e7fe4f811b33AE49ce8D4Aa';

export default new web3.eth.Contract(abi, address);
// export default new web3.eth.Contract(deployedInfo.compiledAbiForReact, deployedInfo.contractAddressForReact);
