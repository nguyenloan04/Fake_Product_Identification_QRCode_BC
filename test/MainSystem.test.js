import hardhat from "hardhat";
import chai from "chai";
import util from "ethers";

const { ethers } = hardhat;
const { expect } = chai;
const { utils } = util;

describe("MainSystem", function () {
  let mainSystem;
  let userContract;
  let deployer;
  let buyer;

  beforeEach(async function () {
    [deployer, buyer] = await ethers.getSigners();

    // Deploy User.sol
    const User = await ethers.getContractFactory("User");
    userContract = await User.deploy();
    await userContract.deployed();

    // Deploy MainSystem
    const MainSystem = await ethers.getContractFactory("MainSystem");
    mainSystem = await MainSystem.deploy("MainSystem", "MS");
    await mainSystem.deployed();

    // Gán địa chỉ contract user
    await mainSystem.setUserContractAddress(userContract.address);

    // Đăng ký người dùng deployer
    await userContract.connect(deployer).registerUser(
      "deployeruser",
      "hashedpass",
      "Deployer Name",
      "ABC123",
      "1999-01-01",
      "deployer@email.com",
      1
    );

    // Kiểm tra mapping tồn tại
    const checkUsername = await userContract.getUsernamesByAddress(deployer.address);
    expect(checkUsername).to.equal("deployeruser");
  });

  it("Create and update product", async function () {
    const owner = deployer.address;

    const title = "Lamb";
    const category = "Livestock";
    const image = "https://img.com/lamb.jpg";
    const price = 14000;
    const shipped = 19224;
    const sold = 14905;
    const onHand = 4319;
    const supplier = "Organic Co.";
    const farm = "Oregon";
    const saleDate = Math.floor(new Date("2022-07-04").getTime() / 1000); // 1656892800

    // Create product
    await mainSystem.createProduct(
      "code-001",
      title,
      category,
      image,
      price,
      shipped,
      sold,
      onHand,
      supplier,
      farm,
      saleDate,
      owner
    );

    const count = await mainSystem.getProductCount();
    expect(count).to.equal(1);
    console.log("First hash: ", await mainSystem.getProductHash(0))
    // Cập nhật product
    const updatedSupplier = "New Supplier";
    const updatedSaleDate = saleDate + 86400; // +1 ngày

    const tx = await mainSystem.updateProduct(
      0,
      "code-121265678",
      title,
      category,
      price + 1000,
      shipped,
      sold,
      onHand,
      updatedSupplier,
      farm,
      updatedSaleDate,
      owner
    );
    await tx.wait();

    const product = await mainSystem.getProduct(0);
    expect(product[9]).to.equal("New Supplier"); // supplier
    expect(product[10]).to.equal("Oregon"); // farmLocation
    console.log("Second hash: ", await mainSystem.getProductHash(0))
    console.log(await mainSystem.checkAuthProduct(0,"code-121265678","New Supplier"))
  });
});
