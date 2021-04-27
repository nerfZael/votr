import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Proposal } from "../../models/Proposal";
import votrService from "../../services/votrService";
import { Voter } from '../../models/Voter';
import Form from 'react-bootstrap/Form';

const VoteAsDelegateSection: React.FC<{userAccount: string, proposal: Proposal }> = ({ userAccount, proposal }) => {
  
  const [voters, setVoters] = useState<Voter[]>([]);
  
  const onSignatureChanged = (index: number, newSignature: string) => {
    setVoters(voters => {

      const voter = voters[index];
      voter.signature = newSignature;

      return [...voters];
    });
  }

  return (
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
                  <th scope="col">Signature</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                { 
                  voters.map((x, i) => {
                    return (
                      <tr key={i} className="">
                        <td>
                          <input type="text" className="form-control" onChange={e => onSignatureChanged(i, e.target.value)}/>
                        </td>
                        <td>
                          <input type="text" className="form-control" value={x.account} disabled={true}/>
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

      <button type="button" className="btn btn-info" onClick={async e => setVoters(x => [...x, new Voter('')])}>Add voter</button>
      <button type="button" className="btn btn-success" onClick={async e => await votrService.voteAsDelegate(userAccount, proposal.id, true, voters)}>Vote to pass</button>
      <button type="button" className="btn btn-danger" onClick={async e => await votrService.voteAsDelegate(userAccount, proposal.id, false, voters)}>Vote to reject</button>
    </div>
  );
};

export default VoteAsDelegateSection;