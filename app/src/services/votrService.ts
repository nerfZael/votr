import web3 from './web3';
import votrContract from './votrContract';
import { Voter } from '../models/Voter';

export default {
  submitProposal(account: string, proposalName: string, duration: number) {
    return votrContract.methods.submitProposal(proposalName, duration)
      .send({ from: account })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
      });
  },
  vote(account: string, proposalId: number, shouldPass: boolean) {
    return votrContract.methods.vote(proposalId.toString(), shouldPass)
      .send({ from: account })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
      });
  },
  delegateVote(account: string, proposalId: number, delegateAccount: string) {
    return votrContract.methods.delegate(proposalId.toString(), delegateAccount)
      .send({ from: account })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
      });
  },
  voteAsDelegate(account: string, proposalId: number, shouldPass: boolean, voters: Voter[]) {
    return votrContract.methods.voteAsDelegate(proposalId.toString(), shouldPass, voters.map(x => x.account), voters.map(x => JSON.parse(x.signature).signature))
      .send({ from: account })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
      });
  },
  async signVote(account: string, proposalId: number, delegateAccount: string): Promise<string> {
    const contractAddress = '0x303761AbE144ef47A19cCB436fb88eF3C09CfF8D';

    const hash = web3.utils.soliditySha3(delegateAccount,  proposalId, contractAddress);

    if(!hash) {
      console.error('Failed to hash message.');
      return '';
    }

    const signature = await web3.eth.personal.sign(hash, account, '');

    const message = {
      voterAccount: account,
      delegateAccount: delegateAccount,
      proposalId,
      contractAddress,
      signature
    };

    const signedMessage = JSON.stringify(message);

    const signer = await this.recoverSigner(signedMessage);

    if(!signer || account.toLowerCase() !== signer.toLowerCase()) {
      console.error('Message corrupted!');
      return '';
    }

    return signedMessage;
  },
  recoverSigner(signedMessageJson: string) {
    const message = JSON.parse(signedMessageJson);

    var hash = web3.utils.soliditySha3(message.delegateAccount,  message.proposalId, message.contractAddress);

    if(!hash) {
      console.error('Failed to hash message.');
      return;
    }

    return web3.eth.personal.ecRecover(hash, message.signature);
  },
  getProposalStatus(proposalId: number): Promise<any> {
    return votrContract.methods.getProposalStatus(proposalId)
      .call();
  }
};