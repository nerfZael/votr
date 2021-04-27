export class Voter {
  constructor(signature: string) {
      this.signature = signature;
  }

  get account(): string {
    return this.signature
      ? JSON.parse(this.signature).voterAccount
    : ''
  }

  signature: string;
}
