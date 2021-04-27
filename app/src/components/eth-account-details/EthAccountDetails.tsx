
const EthAccountDetails: React.FC<{account: string}> = ({ account }) => {

  return (
    <div className="card widget bg-dark">
      <div className="card-header">
        My account
      </div>
      <div className="card-body">
        <div className="">
          Address: {account}
        </div>
      </div>
    </div>     
  );
}

export default EthAccountDetails;