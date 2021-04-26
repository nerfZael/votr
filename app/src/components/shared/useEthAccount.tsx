import { useEffect, useState } from 'react';
import web3 from '../../services/web3';

export default () => {
  const [userAccount, setUserAccount] = useState<string>('');
 
  useEffect(() => {
    web3.eth.requestAccounts().then(accounts => {
      setUserAccount(accounts[0]);
    });
  }, []);

  return userAccount;
};