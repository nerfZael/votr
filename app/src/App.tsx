import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import useEthAccount from "./components/shared/useEthAccount";
import votrContract from './services/votrContract';
import useContractEvents from "./components/shared/useContractEvents";
import EthAccountDetails from "./components/eth-account-details/EthAccountDetails";
import { ToastContainer, toast } from 'react-toastify';
import votrService from './services/votrService';
import SubmitProposalWidget from './components/submit-proposal-widget/SubmitProposalWidget';
import ProposalsTable from './components/proposals-table/ProposalsTable';

export default () => {
  const userAccount = useEthAccount();
  
  return (
    <div className="App">
      <h1>Votr</h1>
      <span>(Off-chain voting via delegates)</span>

      <div className="widgets-container">
        <div>
          <EthAccountDetails account={userAccount} />     

          <SubmitProposalWidget userAccount={userAccount} />
        </div>

        <div className="second-column">
          <ProposalsTable userAccount={userAccount}/>
        </div>
      </div>     
      <ToastContainer />
    </div>
  );
};
