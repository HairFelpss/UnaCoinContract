const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const provider = ganache.provider();
const web3 = new Web3(provider);

//get output of the compilers  
const {interface,bytecode} = require('../compile');
let unacoin;
let accounts;

beforeEach( async ()=> {

    // Get list of all accounts       
    accounts = await web3.eth.getAccounts();

    unacoin = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode, arguments:[[accounts[1],accounts[2]],accounts[3]]})
        .send({from:accounts[0], gas: '1000000', value: '20000000000000000000'});
    
});

describe('UnaCoin',()=>{

    it('Testing Receiver  ', async ()=>{
        assert.equal(await unacoin.methods.receiver().call(),accounts[3]);
    });

    it('Testing The Contract balance  ', async ()=>{
        const bal = await unacoin.methods.getContractBalance().call();
        assert.equal(bal,'20000000000000000000');   
    }); 

    it('Testing The Approval ', async ()=>{
       await unacoin.methods.approve().send({from:accounts[1]}); // First approver 
       await unacoin.methods.approve().send({from:accounts[2]}); // Second approver     
    });

    it('Testing The Receivers balance ', async ()=>{         
      const accBal = await  web3.eth.getBalance(accounts[3]);
      assert.ok(accBal >= 120000000000000000000);        
     });
});