import hardhat from "hardhat";
import chai from "chai";
import util from "ethers";

const { ethers } = hardhat;
const { expect } = chai;
const { utils } = util;

let mainSystem;
let deployer, buyer;

[deployer, buyer] = await ethers.getSigners();
const MainSystem = await ethers.getContractFactory("MainSystem");
mainSystem = await MainSystem.deploy("MainSystem", "MS");
await mainSystem.deployed();
console.log("Contract deployed at:", await mainSystem.address);
// Danh sách các tài khoản
const accounts = await ethers.provider.listAccounts();
for (const account of accounts) {
  const balance = await ethers.provider.getBalance(account);
  console.log(`${account}: ${utils.formatEther(balance)} ETH`);
}
