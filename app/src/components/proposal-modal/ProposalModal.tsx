import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';
import VotingSection from './VotingSection';

const ProposalModal: React.FC<{userAccount: string, proposal: Proposal | null, handleClose: () => void }> = ({ userAccount, proposal, handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose} contentClassName="">
      <Modal.Header closeButton>
        <Modal.Title>
          Proposal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Name: {proposal?.name}
        </div>
        <div>
          Status: {proposal?.status}
        </div>
        <div>
          Number of pass votes: {proposal?.passCount}
        </div>
        <div>
          Number of reject votes: {proposal?.rejectCount}
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