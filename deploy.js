const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const mneumonic = 'staff cube regular aisle nation tiny response tobacco satisfy brother boost affair'

const provider = new HDWalletProvider(
    mneumonic,
    'rinkeby.infura.io/7c761a7016e3428f8872ed02fc5b3014'
);

const web3 = new Web3(provider);

const deploy = async () => {
    try{
    console.log('try => entrou aqui')
    const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
   
    console.log(accounts)
    console.log('Deploying to the Network using account : ', accounts[0]); 

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x'+ bytecode, arguments: [['0x1A84696DD909e41F731392a68118916D977a7dFD','0xd2f313E3Fe49327973903735366ACBc6375DA9ba'],'0xd3779d212E04151391cFb8f5d1032Dfe969776Dd', '0x05CADb75E48CfDd6240c42bc7ed9B44f935c27Cd']})
     .send({gas: '1000000', from : accounts[0], value: '2000000' }).catch((e) => { console.log(e); });

    console.log('Contract Deployed to : ', result.options.address);
    }catch(err){
    console.log('err => entrou aqui')
    console.log(err)
    }
};

deploy();