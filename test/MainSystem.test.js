
import hardhat from "hardhat";
import chai from "chai";
import util from "ethers";

const { ethers } = hardhat;
const { expect } = chai;
const { utils } = util;

describe("MainSystem", async () => {
  let mainSystem;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const MainSystem = await ethers.getContractFactory("MainSystem");
    mainSystem = await MainSystem.deploy("MainSystem", "MS");
    await mainSystem.deployed();
    // Danh sách các tài khoản
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
    it("Set symbol", async () => {
      let symbol = await mainSystem.symbol();
      expect(symbol).equal("MS");
    });

    it("Create new product", async () => {
      const ownerAddress = deployer.address;
      const title = "Lamb";
      const category = "Livestock";
      const pricePerKg = 14;
      const unitsShippedKg = 19224;
      const unitsSoldKg = 14905;
      const unitsOnHandKg = 4319;
      const supplier = "Organic Meet Co.";
      const farmLocation = "O'Reillyboro,OR";
      const saleDate = Math.floor(new Date("2022-07-04").setUTCHours(0, 0, 0, 0) / 1000);
      //
      const result = await mainSystem.createProduct(title, category, pricePerKg, unitsShippedKg, unitsSoldKg,
        unitsOnHandKg, supplier, farmLocation, saleDate, ownerAddress);
      const productCount = await mainSystem.productCount();
      expect(productCount).to.be.equal(1);
      console.log(productCount);

      // update
      const id = 0;
      // const title= "Lamb";
      // const category="LiveStock";
      const newPricePerKg = 15;
      const newSupplier = "Organic Meet Company";
      // const farmLocation = "O'Reillyboro,OR";
      const newSaleDate = Math.floor(new Date("2022-11-04").setUTCHours(0, 0, 0, 0) / 1000);
      //
      const productByIndex = await mainSystem.getProduct(id);
      const oldTitle= productByIndex[1]
      const oldCategory= productByIndex[2]
      const oldUnitShippedKg= productByIndex[4]
      const oldUnitSoldKg=productByIndex[5]
      const olfUnitOnHandKg= productByIndex[6]
      const oldFarmLocation = productByIndex[8]

      // console.log(productByIndex[0]);
      // console.log(productByIndex.category);
      // console.log(productByIndex.unitsShippedKg);
      // console.log(productByIndex.unitsSoldKg);
      // console.log(productByIndex.unitsOnHandKg);
      // console.log(productByIndex.farmLocation);
      const updated= await mainSystem.updateProduct(id,oldTitle,oldCategory,newPricePerKg,oldUnitShippedKg,oldUnitSoldKg,olfUnitOnHandKg,newSupplier,oldFarmLocation,newSaleDate,ownerAddress)
      console.log(await mainSystem.getProduct(id))
      const logByIndex= await mainSystem.getLog(1)
      console.log(typeof logByIndex[2])
      // const content= await mainSystem.debugLog(1)
      // console.log(content)
    });

  });


});