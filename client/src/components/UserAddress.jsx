import React from "react";

function UserAddress(props) {
  const registered = props.addressVoters.includes(props.accounts[0], 0);
  return (
    <div>
      <h1>Your address : {props.accounts}</h1>
      {registered ? <h3>you are registered</h3> : <h3>you are not registered</h3>}
    </div>
  );
}

export default UserAddress;
