import { useState, useEffect } from 'react';
import votrService from '../../services/votrService';
import useContractEvents from '../shared/useContractEvents';
import { toast } from 'react-toastify';
import votrContract from '../../services/votrContract';
import ProposalModal from '../proposal-modal/ProposalModal';
import { Proposal } from '../../models/Proposal';

const ProposalsTable: React.FC<{userAccount: string}> = ({ userAccount }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [show, setShow] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const proposalSubmittedEvents = useContractEvents(
    votrContract, 
    'ProposalSubmitted', 
    (e) => toast(`Proposal submitted: ${e.returnValues.proposalName}`, { type: 'info'})
  );

  useEffect(() => {
    if(proposalSubmittedEvents?.length) {
      const newProposals = proposalSubmittedEvents.map(x => {
        return {
          id: x.returnValues.proposalId,
          name: x.returnValues.proposalName,
          status: ''
        } as Proposal;
      });

      var promises: Promise<any>[] = [];

      for(let proposal of newProposals) {
        const promise = votrService.getProposalInfo(proposal.id);

        promises.push(promise);
      }

      Promise.all(promises).then((infos: any[]) => {
        for(let i = 0; i < infos.length; i++) {
          newProposals[i].status = infos[i].status;
          newProposals[i].passCount = infos[i].passCount;
          newProposals[i].rejectCount = infos[i].rejectCount;
        }

        setProposals(newProposals);
      });
    }
  }, [proposalSubmittedEvents]);

  function openProposalModal(proposal: Proposal) {
    setShow(true);
  }

  useEffect(() => {

  }, [selectedProposal]);

  let proposalModal = selectedProposal
    ? (
      <ProposalModal userAccount={userAccount} proposal={selectedProposal} handleClose={() => setSelectedProposal(null) }/>
    )
    : '';

  return (
    <div className="card widget">
      <div className="card-header">
        Proposals
      </div>
      <div className="card-body">
        <div className="tab">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              { 
                proposals.map((x, i) => {
                  return (
                    <tr key={i} className="" onClick={e => setSelectedProposal(x)}>
                      <td>{x.name}</td>
                      <td>{x.status}</td>
                    </tr>
                  );
                })
              }            
            </tbody>
          </table>
        </div>
      </div>

      {proposalModal}
    </div>
  );
}

export default ProposalsTable;