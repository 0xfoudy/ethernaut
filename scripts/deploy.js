// scripts/deploy.js
async function main() {
    const Instance = await ethers.getContractFactory("NoTransfers");
    console.log("Deploying Instance...");
    const instance = await Instance.deploy('0xDC5832fC3e61B6733c1Ae9f804008B33d9E02865', {value: ethers.utils.parseEther('0.001')});
    await instance.deployed();
    console.log("Instance deployed to:", instance.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });