import React, { useState } from "react";

function Voters(props) {
  const [voterAddr, setVoterAddr] = useState("");

  const addVoter = async () => {
    await props.contract.methods.addVoter(voterAddr).send({ from: props.accounts[0] });
  };

  function handleOnChange(event) {
    const { value } = event.target;
    setVoterAddr(value);
  }

  return (
    <div>
      <h1>Voters</h1>
      {props.addressVoters.map((address, id) => {
        return (
          <h5 key={id}>
            {id} : {address}
          </h5>
        );
      })}
      {/* Check if is owner and workflow == registration started */}
      {props.isOwner && props.workflow === "0" && (
        <div>
          <input name="addr" placeholder="address voter" value={voterAddr} onChange={handleOnChange} />
          <button onClick={addVoter}>Add Voter</button>
        </div>
      )}
    </div>
  );
}

export default Voters;
