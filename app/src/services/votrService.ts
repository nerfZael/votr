import web3 from './web3';
import votrContract from './votrContract';

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
  getProposalStatus(proposalId: number): Promise<any> {
    return votrContract.methods.getProposalStatus(proposalId)
      .call();
  }
};