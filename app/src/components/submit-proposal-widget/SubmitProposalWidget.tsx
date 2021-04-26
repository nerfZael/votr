import { useState, useEffect } from 'react';
import votrService from '../../services/votrService';

const SubmitProposalWidget: React.FC<{userAccount: string}> = ({ userAccount }) => {
  const [proposalName, setProposalName] = useState('');

  return (
    <div className="card widget">
      <div className="card-header">
        Submit a new proposal
      </div>
      <div className="card-body">
        <div className="">
          <div className="">
            <input type="text" className="form-control" onChange={e => setProposalName(e.target.value)}/>
            <button type="button" className="btn btn-success" onClick={async e => await votrService.submitProposal(userAccount, proposalName, 100)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitProposalWidget;