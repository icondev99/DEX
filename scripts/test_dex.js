const { ethers } = require("hardhat");
const { syncBuiltinESMExports } = require("module");

USDC_ADDRESS = '0x0050FD0E8ceeEB06E52e45087f5310165e854f42'
DEX_FIXEDRATE_ADDRESS = '0x84B2CC673EEbB673F449022D26a5952630634d75'
DEX_SIMPLE_ADDRESS = '0x2382515c210Efb50175147726853919cfF613fc1'
DEX_ADDRESS  = '0x0755e440A991c5909C3eB32Dcf3E6036f7ec2059'

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

		// Deploy necessary contracts
		const USDC = await ethers.getContractFactory("USDC");
		const usdc = await USDC.attach(USDC_ADDRESS);
  
		const DEX = await ethers.getContractFactory("DEX")
		const dex = await DEX.attach(DEX_ADDRESS);

		//Eth to Token
		// const initialUSDC = await usdc.balanceOf(DEX_FIXEDRATE_ADDRESS)
		// const initialEth = await ethers.provider.getBalance(DEX_FIXEDRATE_ADDRESS)
		// console.log(`Initial USDC: ${initialUSDC}`)
		// console.log(`Initial Eth: ${initialEth}`)
		// const tx_result = await dex_fixedrate.ethToToken({value: 1000})
		// await sleep(5000)
		// const finalUSDC = await usdc.balanceOf(DEX_FIXEDRATE_ADDRESS)
		// const finalEth = await ethers.provider.getBalance(DEX_FIXEDRATE_ADDRESS)
		// console.log(`Final USDC: ${finalUSDC}`)
		// console.log(`Final Eth: ${finalEth}`)

		// Token To Eth
		const initialUSDC = await usdc.balanceOf(DEX_FIXEDRATE_ADDRESS)
		const initialEth = await ethers.provider.getBalance(DEX_FIXEDRATE_ADDRESS)
		console.log(`Initial USDC: ${initialUSDC}`)
		console.log(`Initial Eth: ${initialEth}`)
		await usdc.approve(DEX_FIXEDRATE_ADDRESS, 1000)
		await sleep(5000)
		await dex_fixedrate.tokenToEth(1000)
		await sleep(5000)
		const finalUSDC = await usdc.balanceOf(DEX_FIXEDRATE_ADDRESS)
		const finalEth = await ethers.provider.getBalance(DEX_FIXEDRATE_ADDRESS)
		console.log(`Final USDC: ${finalUSDC}`)
		console.log(`Final Eth: ${finalEth}`)


}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
