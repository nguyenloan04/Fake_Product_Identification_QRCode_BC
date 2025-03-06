// const { ethers } = require("hardhat");
// const {expect} = require("chai");
// const { utils } = require("ethers");

import hardhat from 'hardhat'
import chai from 'chai'
import util from 'ethers'
const {ethers} = hardhat
const {expect} = chai
const {utils} = util

// const MainSystem = "MainSystem"
// const SYMBOL = "MS"
describe("MainSystem", () => {
    let mainSystem;

    beforeEach(async () => {
        const MainSystem = await ethers.getContractFactory("MainSystem");
        mainSystem = await MainSystem.deploy("MainSystem", "MS");
        const accounts = await ethers.provider.listAccounts();
        for (const account of accounts) {
            const balance = await ethers.provider.getBalance(account);
            console.log(`${account}: ${utils.formatEther(balance)} ETH`);
        }
    });
    describe("Deployment", () => {
        it("Set name", async () => {
            let name = await mainSystem.name();
            expect(name).equal("MainSystem");
        });
    })


})