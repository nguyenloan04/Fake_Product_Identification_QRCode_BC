import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  const productContract = await ethers.getContractAt(
    "MainSystem",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    deployer
  );

  // Thêm sản phẩm mẫu
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
  const result = await productContract.createProduct(title, category, pricePerKg, unitsShippedKg, unitsSoldKg,
    unitsOnHandKg, supplier, farmLocation, saleDate, ownerAddress);

  // await productContract.wait();

  // const tx2 = await productContract.addProduct("Xoài", "Cần Thơ");
  // await tx2.wait();
 const count = await productContract.getProductCount();
  for (let i = 0; i < count; i++) {
    console.log(await productContract.getProduct(i));
    console.log(
      await productContract.getLog(i)
    )
  }
  console.log();
  // console.log("Đã thêm sản phẩm thành công.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
