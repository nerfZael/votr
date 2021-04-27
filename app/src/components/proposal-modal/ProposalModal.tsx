import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';

const VotingSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {
  const [delegateAccount, setDelegateAccount] = useState<string>('');
  const [voters, setVoters] = useState<Voter[]>([]);
  const [signedMessageJson, setSignedMessageJson] = useState<string>('');
  
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

      <div>
        <span><strong>Sign vote for delegate</strong></span>
        <div className="">
            <button type="button" className="btn btn-info" onClick={async e => setSignedMessageJson(await votrService.signVote(userAccount, proposal.id, delegateAccount))}>Sign vote</button>
          <div>
          <Form.Control as="textarea"  value={signedMessageJson} />
          </div>
        </div>
      </div>

      <div>
        <span><strong>Vote as delegate</strong></span>
        
        <div className="card widget">
          <div className="card-header">
            Voters
          </div>
          <div className="card-body">
            <div className="tab">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Address</th>
                    <th scope="col">Signature</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    voters.map((x, i) => {
                      return (
                        <tr key={i} className="">
                          <td>
                            <input type="text" className="form-control" onChange={e => x.account = e.target.value}/>
                          </td>
                          <td>
                            <input type="text" className="form-control" onChange={e => x.signature = e.target.value}/>
                          </td>
                        </tr>
                      );
                    })
                  }            
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-info" onClick={async e => setVoters(x => [...x, { account: '', signature: ''}])}>Add voter</button>
        <button type="button" className="btn btn-success" onClick={async e => await votrService.voteAsDelegate(userAccount, proposal.id, true, voters)}>Vote to pass</button>
        <button type="button" className="btn btn-danger" onClick={async e => await votrService.voteAsDelegate(userAccount, proposal.id, false, voters)}>Vote to reject</button>
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