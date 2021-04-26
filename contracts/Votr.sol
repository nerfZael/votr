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

  Proposal[] public proposals;
  mapping(uint => bool) public hasVoted;

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

  function vote(uint proposalId, bool shouldPass) public isVotingOngoing(proposalId) {
    uint voterId = getVoterId(msg.sender, proposalId);

    require(!hasVoted[voterId], "Already voted on this proposal!");

    hasVoted[voterId] = true;

    if(shouldPass) {
      proposals[proposalId].passCount++;
    } else {
      proposals[proposalId].rejectCount++;
    }
  }

  function getVoterId(address voterAddress, uint proposalId) private pure returns (uint) {
    return uint(keccak256(abi.encodePacked(voterAddress, proposalId)));
  }

  modifier isVotingOngoing(uint proposalId) {
    require(proposals[proposalId].expirationTime > block.timestamp, "Voting has ended!");
    _;
  }

}