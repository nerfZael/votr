// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Votr {
  event ProposalSubmitted(uint proposalId, string proposalName, address submittedBy);

  struct Proposal {
    string name;
    uint passCount;
    uint rejectCount;
    uint expirationTime;
    address submittedBy;
  }

  struct Voter {
    bool hasVoted;
    bool votedToPass;
    uint voteWeight;
    address delegatedTo;
  }

  Proposal[] public proposals;
  mapping(uint => Voter) public voters;
  mapping(address => address) public delegations;

  function submitProposal(string calldata proposalName, uint duration) external {
    proposals.push(Proposal(
      proposalName,
      0,
      0,
      block.timestamp + duration,
      msg.sender
    ));

    emit ProposalSubmitted(proposals.length - 1, proposalName, msg.sender);
  }

  function getProposalStatus(uint proposalId) public view returns (string memory) {
    Proposal memory proposal = proposals[proposalId];

    if(proposal.expirationTime > block.timestamp) {
      return "Pending";
    } else if(proposal.passCount > proposal.rejectCount) {
      return "Passed";
    } else if(proposal.passCount < proposal.rejectCount) {
      return "Rejected";
    } else {
      return "Tied";
    }
  }

  function vote(uint proposalId, bool shouldPass) public isVotingOngoing(proposalId) senderHasNotVoted(proposalId) {
    uint voterId = getVoterId(msg.sender, proposalId);

    Voter storage voter = voters[voterId];

    voter.hasVoted = true;

    if(shouldPass) {
      voter.votedToPass = true;
      //+1 because default weight should be 1 and it defaults to 0
      proposals[proposalId].passCount += voter.voteWeight + 1;
    } else {
      //+1 because default weight should be 1 and it defaults to 0
      proposals[proposalId].rejectCount += voter.voteWeight + 1;
    }
  }

  function delegate(uint proposalId, address delegateAddress) public isVotingOngoing(proposalId) senderHasNotVoted(proposalId) {
    require(msg.sender != delegateAddress, "Delegating to self is not allowed!");

    while (voters[getVoterId(delegateAddress, proposalId)].delegatedTo != address(0)) {
      delegateAddress = voters[getVoterId(delegateAddress, proposalId)].delegatedTo;

      require(msg.sender != delegateAddress, "Delegation loops are not allowed!");
    }

    uint voterId = getVoterId(msg.sender, proposalId);

    Voter storage voter = voters[voterId];

    voter.hasVoted = true;
    voter.delegatedTo = delegateAddress;

    delegations[msg.sender] = delegateAddress;

    uint delegateVoterId = getVoterId(delegateAddress, proposalId);
    Voter storage delegateVoter = voters[delegateVoterId];

    if (delegateVoter.hasVoted) {
      if(delegateVoter.votedToPass) {
        //+1 because default weight should be 1 and it defaults to 0
        proposals[proposalId].passCount += voter.voteWeight + 1;
      } else {
        //+1 because default weight should be 1 and it defaults to 0
        proposals[proposalId].rejectCount += voter.voteWeight + 1;
      }
    } else {
      //+1 because default weight should be 1 and it defaults to 0
      delegateVoter.voteWeight += voter.voteWeight + 1;
    }
  }

  function getVoterId(address voterAddress, uint proposalId) private pure returns (uint) {
    return uint(keccak256(abi.encodePacked(voterAddress, proposalId)));
  }

  modifier isVotingOngoing(uint proposalId) {
    require(proposals[proposalId].expirationTime > block.timestamp, "Voting has ended!");
    _;
  }

  modifier senderHasNotVoted(uint proposalId) {
    uint voterId = getVoterId(msg.sender, proposalId);

    Voter storage voter = voters[voterId];

    require(!voter.hasVoted, "Already voted on this proposal!");
    _;
  }
}