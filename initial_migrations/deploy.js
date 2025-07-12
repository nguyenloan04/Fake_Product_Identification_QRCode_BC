import hardhat from "hardhat";
import chai from "chai";
import util from "ethers";

const { ethers } = hardhat;
const { expect } = chai;
const { utils } = util;
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ABI_DIR = path.join(__dirname, "..", "src", "abis");
const ARTIFACT_DIR = path.join(__dirname, "..", "artifacts", "contracts");
const ENV_PATH = path.resolve(__dirname,"..", ".env");

function upsertEnv(key, value) {
  let content = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8") : "";
  const line = `${key}=${value}`;
  const regex = new RegExp(`^${key}=.*$`, "m");
  content = regex.test(content) ? content.replace(regex, line) : content + `\n${line}`;
  fs.writeFileSync(ENV_PATH, content.trim() + "\n");
}


function copyAbi(contractName) {
  const src = path.join(ARTIFACT_DIR, `${contractName}.sol`, `${contractName}.json`);
  const dst = path.join(ABI_DIR, `${contractName}.json`);

  if (!fs.existsSync(src)) {
    console.warn(`Không tìm thấy artifact: ${src}`);
    return;
  }

  if (!fs.existsSync(ABI_DIR)) {
    fs.mkdirSync(ABI_DIR, { recursive: true });
  }

  if (fs.existsSync(dst)) {
    fs.unlinkSync(dst); // xoá ABI cũ
  }

  const artifact = JSON.parse(fs.readFileSync(src, "utf8"));
  fs.writeFileSync(dst, JSON.stringify(artifact.abi, null, 2));
  console.log(`ABI đã copy: src/abis/${contractName}.json`);
}

let mainSystem, user;
let deployer;

[deployer] = await ethers.getSigners();
const MainSystem = await ethers.getContractFactory("MainSystem");
mainSystem = await MainSystem.deploy("MainSystem", "MS");
await mainSystem.deployed();
console.log("Contract deployed at:", await mainSystem.address);
upsertEnv("VITE_CONTRACT_MAINSYSTEM", mainSystem.address);
copyAbi("MainSystem");

// deploy user
const User = await ethers.getContractFactory("User");
user = await User.deploy();
await user.deployed();
console.log(" User deployed at:", user.address);
upsertEnv("VITE_CONTRACT_USER", user.address);
copyAbi("User");

// Ghi owner vào .env
upsertEnv("VITE_CONTRACT_OWNER", deployer.address);

// Danh sách các tài khoản
const accounts = await ethers.provider.listAccounts();
for (const account of accounts) {
  const balance = await ethers.provider.getBalance(account);
  console.log(`${account}: ${utils.formatEther(balance)} ETH`);
}
