async function shouldThrow(promise) {
  try {
      await promise;
      assert(true);
  }
  catch (err) {
      return;
  }

  assert(false, "The contract did not throw.");
}

async function sign(msg, address) {
  let signature = await web3.eth.sign(msg, address);
  signature = signature.substr(0, 130) + (signature.substr(130) == "00" ? "1b" : "1c");
  
  return signature;
}

module.exports = {
    shouldThrow,
    sign
};
  