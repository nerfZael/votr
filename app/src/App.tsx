import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import useEthAccount from "./components/shared/useEthAccount";
import votrContract from './services/votrContract';
import useContractEvents from "./components/shared/useContractEvents";
import EthAccountDetails from "./components/eth-account-details/EthAccountDetails";

export default () => {
  const userAccount = useEthAccount();

  useEffect(() => {
    if(userAccount) {
      // votrContract.methods.submitProposal('prop1', new Date().getTime().toString())
      // .send({ from: userAccount })        
      // .on("receipt", (receipt: any) => {
      //   console.log(receipt);
      // });
    }
  }, [userAccount]);

  
  const proposalSubmittedEvents = useContractEvents(
    votrContract, 
    'ProposalSubmitted', 
    (e) => console.log(`Proposal submitted: ${e.returnValues.proposalName}`)
  );

  return (
    <div className="App">
      <h1>Votr</h1>

      <EthAccountDetails account={userAccount} />     

      <div className="card widget">
        <div className="card-body">
          <div className="tab">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Proposal name</th>
                </tr>
              </thead>
              <tbody>
                { proposalSubmittedEvents 
                ? proposalSubmittedEvents.map((x, i) => {
                  return (
                    <tr key={i} className="">
                      <td>{x.returnValues.proposalName}</td>
                    </tr>
                  );
                })
                : ''
              }            
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
