import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import useEthAccount from "./components/shared/useEthAccount";
import votrContract from './services/votrContract';

export default () => {
  const userAccount = useEthAccount();

  useEffect(() => {
    if(userAccount) {
      votrContract.methods.submitProposal('prop1', new Date().getTime().toString())
      .send({ from: userAccount })        
      .on("receipt", (receipt: any) => {
        console.log(receipt);
      });
    }
  }, [userAccount]);

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          <div className="">
            Hello turtle!
          </div>
        </div>
      </div>
    </div>
  );
};
