import { useState, useEffect } from 'react';
import votrService from '../../services/votrService';
import useContractEvents from '../shared/useContractEvents';
import { toast } from 'react-toastify';
import votrContract from '../../services/votrContract';

type Proposal = {
  id: number;
  name: string;
  status: string;
};

const ProposalsTable: React.FC<{}> = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

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
        const promise = votrService.getProposalStatus(proposal.id);

        promises.push(promise);
      }

      Promise.all(promises).then((statuses: string[]) => {
        for(let i = 0; i < statuses.length; i++) {
          newProposals[i].status = statuses[i];
        }

        setProposals(newProposals);
      });
    }
  }, [proposalSubmittedEvents])

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
                    <tr key={i} className="">
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
    </div>
  );
}

export default ProposalsTable;