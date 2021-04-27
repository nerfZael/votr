import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';
import DelegateVoteSection from './DelegateVoteSection';
import VoteAsDelegateSection from "./VoteAsDelegateSection";
import "./VotingSection.scss";

const VotingSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {

  return (
    <div className="VotingSection">
      <div className="voting-buttons">
        <button className="btn btn-success pass-btn" onClick={e => votrService.vote(userAccount, proposal.id, true)}>
          Pass
        </button>
        <button className="btn btn-danger" onClick={e => votrService.vote(userAccount, proposal.id, false)}>
          Reject
        </button>
      </div>

      <DelegateVoteSection userAccount={userAccount} proposal={proposal}/>
     
      <VoteAsDelegateSection userAccount={userAccount} proposal={proposal}/>
      
    </div>
  );
};

export default VotingSection;