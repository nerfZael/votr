import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';
import DelegateVoteSection from './DelegateVoteSection';
import VoteAsDelegateSection from "./VoteAsDelegateSection";

const VotingSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {

  return (
    <div>
      <button className="btn btn-success" onClick={e => votrService.vote(userAccount, proposal.id, true)}>
        Pass
      </button>
      <button className="btn btn-danger" onClick={e => votrService.vote(userAccount, proposal.id, false)}>
        Reject
      </button>

      <DelegateVoteSection userAccount={userAccount} proposal={proposal}/>
     
      <VoteAsDelegateSection userAccount={userAccount} proposal={proposal}/>
      
    </div>
  );
};

export default VotingSection;