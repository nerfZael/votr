
const EthAccountDetails: React.FC<{account: string}> = ({ account }) => {

  return (
    <div className="card widget">
      <div className="card-body">
        <div className="">
          My address: {account}
        </div>
      </div>
    </div>     
  );
}

export default EthAccountDetails;