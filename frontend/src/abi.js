// frontend/src/abi.js
export const CONTRACT_ABI = [
    {
      "inputs":[
        { "internalType":"bytes32", "name":"certHash", "type":"bytes32" },
        { "internalType":"string", "name":"meta", "type":"string" }
      ],
      "name":"issueCertificate",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        { "internalType":"bytes32", "name":"certHash", "type":"bytes32" }
      ],
      "name":"revokeCertificate",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        { "internalType":"bytes32", "name":"certHash", "type":"bytes32" }
      ],
      "name":"verifyCertificate",
      "outputs":[
        { "internalType":"bool", "name":"exists", "type":"bool" },
        { "internalType":"address", "name":"issuer", "type":"address" },
        { "internalType":"uint256", "name":"issuedAt", "type":"uint256" },
        { "internalType":"string", "name":"meta", "type":"string" },
        { "internalType":"bool", "name":"revoked", "type":"bool" }
      ],
      "stateMutability":"view",
      "type":"function"
    }
  ];
  