// We import Chai to use its asserting functions here.
const assert = require("chai").assert;

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
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
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    it("Should assign the total supply of tokens to the owner", async function () {
      let ownerBalance = await hardhatToken.balanceOf(owner.address);
      ownerBalance = ownerBalance.toString()
      let balance = await hardhatToken.totalSupply()
      balance = balance.toString()
      assert.equal(balance, ownerBalance)
      // expect(balance).to.equal(ownerBalance)
      // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      assert.equal(addr1Balance.toString(),'50');

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      assert.equal(addr2Balance.toString(),'50');
    });

    it("Should fail if sender doesn???t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address).toString();

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      try{
        await hardhatToken.connect(addr1).transfer(owner.address, 100)
      }catch(error) {
        const errorMessage ="transfer amount exceeds balance"
        console.log(error.message)
        errorValue = error.message.search(errorMessage);
        assert.isAtLeast(errorValue, 0)
      }

      // Owner balance shouldn't have changed.
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address).toString()
      assert.equal(initialOwnerBalance, finalOwnerBalance)

    });

    it("Should update balances after transfers", async function () {
      let initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      initialOwnerBalance = parseInt(initialOwnerBalance.toString())

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2.address, 50);

      // Check balances.
      let finalOwnerBalance = await hardhatToken.balanceOf(owner.address)
      finalOwnerBalance = parseInt(finalOwnerBalance.toString())
      assert.equal(finalOwnerBalance, initialOwnerBalance+150)

      let addr1Balance = await hardhatToken.balanceOf(addr1.address)
      addr1Balance = addr1Balance.toString()
      assert.equal(addr1Balance, '100');

      let addr2Balance = await hardhatToken.balanceOf(addr2.address)
      addr2Balance = addr2Balance.toString()
      assert.equal(addr2Balance, '50');
    });
  });
});

