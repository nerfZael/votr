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
  getProposalStatus(proposalId: number): Promise<any> {
    return votrContract.methods.getProposalStatus(proposalId)
      .call();
  }
};