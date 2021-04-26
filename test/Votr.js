const Votr = artifacts.require("Votr");
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract("Votr", (accounts) => {
  let [alice, bob, john] = accounts;
  let contractInstance;

  const proposals = [
    'Test1',
    'Test2'
  ];

  beforeEach(async () => {
    contractInstance = await Votr.new();
  });

  context("with the standard voting scenario", async () => {
    xit("should be able to submit a proposal", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      assert.equal(result.receipt.status, true);
      assert.equal(result.receipt.logs[0].returnValues.proposalName, proposalName);
    });
  
    xit("should be able to vote on a proposal", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      const result1 = await contractInstance.vote(proposalId, true, {from: alice});
      const result2 = await contractInstance.vote(proposalId, false, {from: bob});
  
      assert.equal(result1.receipt.status, true);
      assert.equal(result2.receipt.status, true);
    });
  
    xit("should not able to vote more than once on a proposal", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      await utils.shouldThrow(contractInstance.vote(proposalId, true, {from: alice}));
      await utils.shouldThrow(contractInstance.vote(proposalId, false, {from: alice}));
    });
  
    xit("should not able to vote on a proposal once voting ends", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      await time.increase(time.duration.days(1));
  
      await utils.shouldThrow(contractInstance.vote(proposalId, false, {from: bob}));
    });
  
    xit("should be able to get proposal status (Pending and Passed)", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      let proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Pending');
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Pending');
  
      await time.increase(time.duration.days(1));
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Passed');
    });
  
    xit("should be able to get proposal status (Pending and Tied)", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      await contractInstance.vote(proposalId, false, {from: bob});
  
      let proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Pending');
  
      await time.increase(time.duration.days(1));
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Tied');
    });
  
    xit("should be able to get proposal status (Pending and Rejected)", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName, duration, {from: alice});
  
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      await contractInstance.vote(proposalId, false, {from: bob});
  
      await contractInstance.vote(proposalId, false, {from: john});
  
      let proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Pending');
  
      await time.increase(time.duration.days(1));
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Rejected');
    });

    xit("should be able to get status of a previous proposal", async () => {
      const proposalName1 = proposals[0];
      const proposalName2 = proposals[1];
      const duration = time.duration.days(1);
  
      await contractInstance.submitProposal(proposalName1, duration, {from: alice});
  
      const proposalId1 = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId1, true, {from: alice});
  
      await time.increase(time.duration.days(1));
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId1, {from: alice});
      assert.equal(proposalStatus, 'Passed');

      await contractInstance.submitProposal(proposalName2, duration, {from: alice});
  
      const proposalId2 = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId2, false, {from: alice});
  
      await time.increase(time.duration.days(1));
  
      proposalStatus = await contractInstance.getProposalStatus(proposalId2, {from: alice});
      assert.equal(proposalStatus, 'Rejected');
      
      proposalStatus = await contractInstance.getProposalStatus(proposalId1, {from: alice});
      assert.equal(proposalStatus, 'Passed');
    });
  });

  
  context("with the standard delegate voting scenario", async () => {
    xit("should be able to delegate own vote", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      const delegateResult = await contractInstance.delegate(proposalId, bob, {from: alice});

      assert.equal(delegateResult.receipt.status, true);
    });

    xit("should not be able to delegate own vote if already voted", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.vote(proposalId, true, {from: alice});
  
      await utils.shouldThrow(contractInstance.delegate(proposalId, bob, {from: alice}));
    });

    xit("should not be able to vote if already delegated own vote", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.delegate(proposalId, bob, {from: alice});
  
      await utils.shouldThrow(contractInstance.vote(proposalId, true, {from: alice}));
    });

    xit("should be able to be a delegate for multiple people", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.delegate(proposalId, alice, {from: bob});
  
      const delegateResult = await contractInstance.delegate(proposalId, alice, {from: john});

      assert.equal(delegateResult.receipt.status, true);
    });

    xit("should not be able to delegate vote to self", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await utils.shouldThrow(contractInstance.delegate(proposalId, alice, {from: alice}));
    });
  
    xit("should not be able to cause a loop in delagation", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;

      await contractInstance.delegate(proposalId, bob, {from: alice});

      await contractInstance.delegate(proposalId, john, {from: bob});

      await utils.shouldThrow(contractInstance.delegate(proposalId, alice, {from: john}));
    });

    xit("should be able to vote as a delegate", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.delegate(proposalId, bob, {from: alice});

      const voteResult = await contractInstance.vote(proposalId, true, {from: bob});

      assert.equal(voteResult.receipt.status, true);
    });

    xit("should count a delegated vote with more weight", async () => {
      const proposalName = proposals[0];
      const duration = time.duration.days(1);
  
      const result = await contractInstance.submitProposal(proposalName, duration, {from: alice});
      const proposalId = result.receipt.logs[0].returnValues.proposalId;
  
      await contractInstance.delegate(proposalId, bob, {from: alice});

      await contractInstance.vote(proposalId, true, {from: bob});
      await contractInstance.vote(proposalId, false, {from: john});

      const proposalStatus = await contractInstance.getProposalStatus(proposalId, {from: alice});
      assert.equal(proposalStatus, 'Passed');
    });
  });
})
