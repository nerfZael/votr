import { useState, useEffect } from 'react';
import votrService from '../../services/votrService';
import './SubmitProposalWidget.scss';

const SubmitProposalWidget: React.FC<{userAccount: string}> = ({ userAccount }) => {
  const [proposalName, setProposalName] = useState('');
  const [proposalDuration, setProposalDuration] = useState(100);

  return (
    <div className="SubmitProposalWidget card widget bg-dark">
      <div className="card-header">
        Submit a new proposal
      </div>
      <div className="card-body">
        <div className="">
          <div className="">
            <input className="proposal-name-input form-control" placeholder="Proposal name..." type="text" onChange={e => setProposalName(e.target.value)}/>
            <input className="proposal-name-input form-control" placeholder="Duration in seconds..." type="number" onChange={e => setProposalDuration(Number(e.target.value))}/>
            <button type="button" className="btn btn-success" onClick={async e => await votrService.submitProposal(userAccount, proposalName, proposalDuration)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitProposalWidget;