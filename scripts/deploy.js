async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	// Deploy necessary contracts
	const USDC = await ethers.getContractFactory("USDC");
	const usdc = await USDC.deploy();
	console.log(`Deployed USDC at ${usdc.address}`)

	const SwapContract = await ethers.getContractFactory("SwapContract")
	const swapcontract = await SwapContract.deploy(usdc.address);
	console.log(`Deployed SwapContract at ${swapcontract.address}`)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
