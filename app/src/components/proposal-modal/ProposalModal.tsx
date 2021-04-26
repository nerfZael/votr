import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";


const VotingSection: React.FC<{userAccount: string, proposal: Proposal | null }> = ({ userAccount, proposal }) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button className="btn btn-success">
        Pass
      </button>
      <button className="btn btn-danger">
        Reject
      </button>
    </div>
  );
};


const ProposalModal: React.FC<{userAccount: string, proposal: Proposal | null, handleClose: () => void }> = ({ userAccount, proposal, handleClose }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show} onHide={handleClose} contentClassName="">
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProposalModal;