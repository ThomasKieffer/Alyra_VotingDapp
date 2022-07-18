import React, { useState } from "react";

function Workflow(props) {
  const [winner, setWinner] = useState(0);

  const nextWorkflow = async () => {
    switch (props.workflow) {
      case "0":
        await props.contract.methods.startProposalsRegistering().send({ from: props.accounts[0] });
        break;

      case "1":
        await props.contract.methods.endProposalsRegistering().send({ from: props.accounts[0] });
        break;

      case "2":
        await props.contract.methods.startVotingSession().send({ from: props.accounts[0] });
        break;

      case "3":
        await props.contract.methods.endVotingSession().send({ from: props.accounts[0] });
        break;

      case "4": //Caluclate winner and set it.
        await props.contract.methods.tallyVotes().send({ from: props.accounts[0] });
        setWinner(await props.contract.methods.winningProposalID().call({ from: props.accounts[0] }));
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div>
        {props.workflow === "0" && <h1>Workflow : Registering voters</h1>}
        {props.workflow === "1" && <h1>Workflow : Proposals registration started</h1>}
        {props.workflow === "2" && <h1>Workflow : Proposals registration ended</h1>}
        {props.workflow === "3" && <h1>Workflow : Voting session started</h1>}
        {props.workflow === "4" && <h1>Workflow : Voting session ended</h1>}
        {props.workflow === "5" && (
          <div>
            <h1>Workflow : Votes tallied</h1>
            <h1>Winner is {winner}</h1>
          </div>
        )}
      </div>
      {props.isOwner && (
        <div>
          {props.workflow === "0" && <button onClick={nextWorkflow}>Start proposals registration</button>}
          {props.workflow === "1" && <button onClick={nextWorkflow}>End proposals registration</button>}
          {props.workflow === "2" && <button onClick={nextWorkflow}>Start votes</button>}
          {props.workflow === "3" && <button onClick={nextWorkflow}>End votes</button>}
          {props.workflow === "4" && <button onClick={nextWorkflow}>Tally votes</button>}
        </div>
      )}
    </div>
  );
}

export default Workflow;
