import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";


const VotingSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {
  return (
    <div>
      <button className="btn btn-success" onClick={e => votrService.vote(userAccount, proposal.id, true)}>
        Pass
      </button>
      <button className="btn btn-danger" onClick={e => votrService.vote(userAccount, proposal.id, false)}>
        Reject
      </button>
    </div>
  );
};


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