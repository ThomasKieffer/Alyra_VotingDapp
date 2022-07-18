import React, { useState } from "react";

function SetVote(props) {
  const [voteId, setVoteId] = useState(0);
  const registered = props.addressVoters.includes(props.accounts[0], 0);

  function handleOnChange(event) {
    const { value } = event.target;
    setVoteId(value);
  }

  const vote = async () => {
    const response = await props.contract.methods.setVote(voteId).send({ from: props.accounts[0] });
  };

  return (
    <div>
      <h1>Vote for a proposal</h1>
      {/* Check if is registered and workflow == votingSessionStarted */}
      {registered && props.workflow === "3" && (
        <div>
          <input name="Vote" placeholder="Id of proposal" value={voteId} onChange={handleOnChange} />
          <button onClick={vote}>Add Voter</button>
        </div>
      )}
    </div>
  );
}

export default SetVote;
