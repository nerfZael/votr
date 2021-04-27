import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';
import VotingSection from './VotingSection';
import './ProposalModal.scss';

const ProposalModal: React.FC<{userAccount: string, proposal: Proposal | null, handleClose: () => void }> = ({ userAccount, proposal, handleClose }) => {
  
  return (
    <Modal size="lg" show={true} onHide={handleClose} contentClassName="bg-dark ProposalModal">
      <Modal.Header closeButton>
        <Modal.Title>
          Proposal: {proposal?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="status">
          Status: <span className={proposal?.status}>{proposal?.status}</span>
        </div>

        <div className="vote-cnt">
          <div>
           Pass votes: {proposal?.passCount}
          </div>
          <div>
            Reject votes: {proposal?.rejectCount}
          </div>

        </div>

        {
          proposal?.status === 'Pending'
            ? <VotingSection userAccount={userAccount} proposal={proposal} />
            : ''
        }
      </Modal.Body>
    </Modal>
  );
}

export default ProposalModal;