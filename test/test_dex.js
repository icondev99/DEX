// We import Chai to use its asserting functions here.
const assert = require("chai").assert;

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("DEX contract", function () {
	// Mocha has four functions that let you hook into the the test runner's
	// lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

	// They're very useful to setup the environment for tests, and to clean it
	// up after they run.

	// A common pattern is to declare some variables, and assign them in the
	// `before` and `beforeEach` callbacks.

	let Token;
	let hardhatToken;
	let owner;
	let addr1;
	let addr2;
	let addrs;

	// `beforeEach` will run before each test, re-deploying the contract every
	// time. It receives a callback, which can be async.
	beforeEach(async function () {
		// Get the ContractFactory and Signers here.
		Token = await ethers.getContractFactory("Token");
		DEX = await ethers.getContractFactory("DEX");
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		// To deploy our contract, we just have to call Token.deploy() and await
		// for it to be deployed(), which happens once its transaction has been
		// mined.
		hardhatToken = await Token.deploy();
		dex = await DEX.deploy(hardhatToken.address);

		provider = await waffle.provider;

	});

	// You can nest describe calls to create subsections.
	describe("Deployment", function () {
		// `it` is another Mocha function. This is the one you use to define your
		// tests. It receives the test name, and a callback function.

		it("Initial balance in the contract must be 0", async function () {
			let dexBalance = await hardhatToken.balanceOf(hardhatToken.address)
			dexBalance = dexBalance.toString()
			assert.equal(dexBalance, '0')

			dexBalance = await provider.getBalance(dex.address)
			dexBalance = dexBalance.toString()
			assert.equal(dexBalance, '0')
		});

	});

	describe("Sell", function () {
		it("Seller should hold try to sell some amount", async function () {
			//Try to sell 50 tokens
			try {
				dex.connect(addr1).sell(0)
			} catch (error) {
				const errorMessage = 'You need to sell at least some token';
				const errorValue = error.message.search(errorMessage);
				assert.isAtLeast(errorValue, 0);
			}
		});
		it("Seller should hold tokens before trying to sell", async function () {
			//Try to sell 50 tokens
			try {
				dex.connect(addr1).sell(50)
			} catch (error) {
				const errorMessage = 'Not enough balance';
				const errorValue = error.message.search(errorMessage);
				assert.isAtLeast(errorValue, 0);
			}
			await hardhatToken.transfer(addr1.address, 50)
		});
		it("Seller should allow DEX before trying to sell", async function () {
			//Try to sell 50 tokens
			try {
				dex.connect(addr1).sell(50)
			} catch (error) {
				const errorMessage = 'Check the total allowance';
				const errorValue = error.message.search(errorMessage);
				assert.isAtLeast(errorValue, 0);
			}
			await hardhatToken.approve(dex.address, 50)
			dex.connect(addr1).sell(50)
		});
	});

	// describe("Buy", function () {
	// 	it("Contract should hold tokens to buy", async function () {
	// 		// Try to buy 50 tokens
	// 		dexBalance = await hardhatToken.balanceOf(dex.address)
	// 		dexBalance = dexBalance.toString()
	// 		console.log(dexBalance)

	// 		dexBalance = await provider.getBalance(dex.address)
	// 		dexBalance = dexBalance.toString()
	// 		console.log(dexBalance)
	// 		try {
	// 			dex.buy({ value: 0 })
	// 		} catch (error) {
	// 			const errorMessage = ''
	// 			console.log(error.message)
	// 		}
	// 	});

	// });

});
