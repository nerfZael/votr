import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';

const DelegateVoteSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {
  const [delegateAccount, setDelegateAccount] = useState<string>('');
  const [signedMessageJson, setSignedMessageJson] = useState<string>('');
  
  return (
    <div>
      <span><strong>Delegate vote</strong></span>
      <div className="">
          <input type="text" className="form-control" onChange={e => setDelegateAccount(e.target.value)}/>
          <button type="button" className="btn btn-success" onClick={async e => await votrService.delegateVote(userAccount, proposal.id, delegateAccount)}>Delegate vote</button>
          <button type="button" className="btn btn-info" onClick={async e => setSignedMessageJson(await votrService.signVote(userAccount, proposal.id, delegateAccount))}>Sign vote</button>
          {
            signedMessageJson 
                ? (
                    <div>
                      <Form.Control as="textarea"  value={signedMessageJson} />
                    </div>
                )
                : ''
          }
      </div>
    </div>
  );
};

export default DelegateVoteSection;