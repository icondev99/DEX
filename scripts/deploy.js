async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

		// Deploy necessary contracts
		const USDC = await ethers.getContractFactory("USDC");
		const usdc = await USDC.deploy();
		console.log(`Deployed USDC at ${usdc.address}`)
  
		const DEX_FixedRate = await ethers.getContractFactory("DEX_FixedRate")
		const dex_fixedrate = await DEX_FixedRate.deploy(usdc.address);
		console.log(`Deployed DEX_FixedRate at ${dex_fixedrate.address}`)

		const DEX_Simple = await ethers.getContractFactory("DEX_Simple")
		const dex_simple = await DEX_Simple.deploy(usdc.address);
		console.log(`Deployed DEX_Simple at ${dex_simple.address}`)

		const DEX = await ethers.getContractFactory("DEX")
		const dex = await DEX.deploy(usdc.address);
		console.log(`Deployed DEX at ${dex.address}`)

		console.log(`Approving 50 USDC token for DEX_FixedRate`)
		await usdc.approve(dex_fixedrate.address, ethers.utils.parseEther('50'))
		console.log(`Approving 50 USDC token for DEX_Simple`)
		await usdc.approve(dex_simple.address, ethers.utils.parseEther('50'))
		console.log(`Approving 50 USDC token for DEX`)
		await usdc.approve(dex.address, ethers.utils.parseEther('50'))

		// Dex initalization
		console.log(`Initializing DEX_FixedRate with 50 USDC token and 1 Ether.`)
		await dex_fixedrate.init(ethers.utils.parseEther('50'), {
			value: ethers.utils.parseEther('1')
		})

		console.log(`Initializing DEX_SimpleRate with 50 USDC token and 1 Ether.`)
		await dex_simple.init(ethers.utils.parseEther('50'), {
			value: ethers.utils.parseEther('1')
		})

		console.log(`Initializing DEX with 50 USDC token and 1 Ether.`)
		await dex.init(ethers.utils.parseEther('50'), {
			value: ethers.utils.parseEther('1')
		})

}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
