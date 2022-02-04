async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

		// Deploy necessary contracts
		const USDC = await ethers.getContractFactory("Token");
		const usdc = await USDC.deploy();
		console.log(`Deployed USDC at ${usdc.address}`)
  
		const DEX = await ethers.getContractFactory("DEX")
		const dex = await DEX.deploy(usdc.address);
		console.log(`Deployed DEX at ${dex.address}`)

}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
