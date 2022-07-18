import React, { useState } from "react";

function Proposals(props) {
  const [proposalDesc, setProposalDesc] = useState("");
  const registered = props.addressVoters.includes(props.accounts[0], 0);

  //   const [proposalFromPromise, setproposalFromPromise] = useState("");
  //   const [proposalPromises, setProposalPromises] = useState("");
  const [proposalPromisesDesc, setProposalPromisesDesc] = useState("");

  const addProposal = async () => {
    const response = await props.contract.methods.addProposal(proposalDesc).send({ from: props.accounts[0] });
  };

  function handleOnChange(event) {
    const { value } = event.target;
    setProposalDesc(value);
  }

  //   const data;
  const getDescriptionPromise = async () => {
    await props.proposals.map(async (proposal, id) => {
      const promise = await props.contract.methods.getOneProposal(proposal).call({ from: props.accounts[0] });
      console.log(promise);
      setProposalPromisesDesc(promise.description);
      console.log(proposalPromisesDesc);
    });
    // const promise = await props.contract.methods.getOneProposal().call({ from: props.accounts[0] });
    // console.log(promise);

    // console.log(promise.description);
    // console.log(promise.voteCount);
    // setProposalPromises(promise.description);
    // console.log(promise.description);
    // data = {promise.description, promise.description}
    // return promise.description;
    // setproposalFromPromise(promise.description);
  };

  React.useEffect(() => {
    getDescriptionPromise();
  }, []);

  return (
    <div>
      <h1>Proposals</h1>
      {props.proposals.map((proposal, id) => {
        {
          /* getDescriptionPromise(proposal); */
        }
        return (
          <h5 key={id}>
            {id} : {proposal}
          </h5>
        );
      })}
      {/* Check if is owner and workflow == registration started */}
      {registered && props.workflow === "1" && (
        <div>
          <input name="proposal" placeholder="Description" value={proposalDesc} onChange={handleOnChange} />
          <button onClick={addProposal}>Add Proposal</button>
        </div>
      )}
    </div>
  );
}

export default Proposals;
