const path = require('path');
const fs = require('fs');
const solc = require('solc'); 

const sourcePath = path.resolve(__dirname,'contracts','unacoin.sol');

const source = fs.readFileSync(sourcePath,'utf8');

module.exports = solc.compile(source,1).contracts[':UnaCoin'];