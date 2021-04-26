import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";


const VotingSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {
  const [delegateAccount, setDelegateAccount] = useState<string>('');
  
  return (
    <div>
      <button className="btn btn-success" onClick={e => votrService.vote(userAccount, proposal.id, true)}>
        Pass
      </button>
      <button className="btn btn-danger" onClick={e => votrService.vote(userAccount, proposal.id, false)}>
        Reject
      </button>

      <div>
        <span><strong>Delegate vote</strong></span>
        <div className="">
            <input type="text" className="form-control" onChange={e => setDelegateAccount(e.target.value)}/>
            <button type="button" className="btn btn-success" onClick={async e => await votrService.delegateVote(userAccount, proposal.id, delegateAccount)}>Delegate vote</button>
          </div>
      </div>
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