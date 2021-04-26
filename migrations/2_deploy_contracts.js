const Votr = artifacts.require("Votr");

module.exports = function(deployer) {
  deployer.deploy(Votr);
};
