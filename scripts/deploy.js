// scripts/deploy.js
async function main() {
    const Instance = await ethers.getContractFactory("Instance");
    console.log("Deploying Instance...");
    const instance = await Instance.deploy("abcde");
    await instance.deployed();
    console.log("Instance deployed to:", instance.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });