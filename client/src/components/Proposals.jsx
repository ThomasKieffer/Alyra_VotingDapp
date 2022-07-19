import React, { useState, useEffect } from "react";

function Proposals(props) {
  const [proposalDesc, setProposalDesc] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const registered = props.addressVoters.includes(props.accounts[0], 0);

  const addProposal = async () => {
    await props.contract.methods.addProposal(proposalDesc).send({ from: props.accounts[0] });
  };

  function handleOnChange(event) {
    const { value } = event.target;
    setProposalDesc(value);
  }
  useEffect(() => {
    async function retrieveProposalsContent(id) {
      if (registered) {
        const content = await props.contract.methods.getOneProposal(id).call({ from: props.accounts[0] });
        console.log(content);
        return content;
      }
      return "";
    }

    //reinitiate proposal if we add another one
    setDescriptions([]);

    //TODO: refactor this mess
    props.proposals.map(async (proposal, id) => {
      const propContent = await retrieveProposalsContent(proposal);
      setDescriptions((prevDescription) => {
        return [...prevDescription, propContent.description];
      });
    });
  }, [props.proposals, props.accounts, props.contract.methods, registered]);

  return (
    <div>
      <h1>Proposals</h1>
      {props.proposals.map((proposal) => {
        return (
          <h5 key={proposal}>
            {proposal} : {descriptions[proposal]}
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
