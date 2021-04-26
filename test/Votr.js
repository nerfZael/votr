const Votr = artifacts.require("Votr");

contract("Votr", (accounts) => {
  let [alice, bob] = accounts;
  let contractInstance;

  beforeEach(async () => {
      contractInstance = await Votr.new();
  });
})
