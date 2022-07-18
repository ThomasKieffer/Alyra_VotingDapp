import React, { useState, useEffect } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import UserAddress from "./components/UserAddress.jsx";
import Workflow from "./components/Workflow";
import Voters from "./components/Voters";
import Proposals from "./components/Proposals";
import SetVote from "./components/SetVote";

function App() {
  // const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState("");
  const [contract, setContract] = useState("");
  const [owner, setOwner] = useState("");
  const [isOwner, setIsOwner] = useState("");

  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [addressVoters, setaddressVoters] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function setUpWeb3() {
      try {
        const web3Provider = await getWeb3();
        const accounts = await web3Provider.eth.getAccounts();
        const networkId = await web3Provider.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3Provider.eth.Contract(VotingContract.abi, deployedNetwork && deployedNetwork.address);

        // setWeb3(web3Provider);
        setAccounts(accounts);
        setContract(instance);

        //récupère l'addresse du owner.
        const own = await instance.methods.owner().call({ from: accounts[0] });
        setOwner(own);

        //initialize the workflow in the state
        const initWorkflow = await instance.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(initWorkflow);

        //check if the current user is the owner
        // console.log(own === accounts[0]);
        setIsOwner(own === accounts[0]);

        let from0Tolast = {
          fromBlock: 0,
          toBlock: "latest",
        };

        let fromLast = {
          fromBlock: "latest",
        };

        //here we listen for workflow status changes
        instance.events.WorkflowStatusChange(fromLast).on("data", (event) => {
          setWorkflowStatus(event.returnValues.newStatus);
        });

        // here we listen for past proposals events
        let addresses = await instance.getPastEvents("VoterRegistered", from0Tolast);
        setaddressVoters(
          addresses.map((add) => {
            return add.returnValues.voterAddress;
          })
        );
        // here we listen for next proposals events
        instance.events.VoterRegistered(fromLast).on("data", (event) => {
          setaddressVoters((prevAddresses) => {
            return [...prevAddresses, event.returnValues.voterAddress];
          });
        });

        // here we listen for past voter registered
        let proposalsEvt = await instance.getPastEvents("ProposalRegistered", from0Tolast);
        setProposals(
          proposalsEvt.map((prop) => {
            return prop.returnValues.proposalId;
          })
        );
        // here we listen for next voter registered
        instance.events.ProposalRegistered(fromLast).on("data", (event) => {
          setProposals((prevProposal) => {
            return [...prevProposal, event.returnValues.proposalId];
          });
        });
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    }

    setUpWeb3();
  }, []);

  return (
    <div id="App">
      <div className="container">
        <h1>Voting</h1>
        <UserAddress accounts={accounts} addressVoters={addressVoters} />
        <Workflow contract={contract} accounts={accounts} workflow={workflowStatus} isOwner={isOwner} />
        <Voters contract={contract} accounts={accounts} workflow={workflowStatus} isOwner={isOwner} addressVoters={addressVoters} />
        <Proposals contract={contract} accounts={accounts} workflow={workflowStatus} addressVoters={addressVoters} proposals={proposals} />
        <SetVote contract={contract} accounts={accounts} workflow={workflowStatus} addressVoters={addressVoters} proposals={proposals} />
      </div>
    </div>
  );
}

export default App;
