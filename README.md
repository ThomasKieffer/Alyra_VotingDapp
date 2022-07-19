# Voting Dapp

(Work in progress)
This project has been done as part of my blockchain developper training at Alyra, to teach us how to write a dapp and deploy it.
It makes use of React and web3 to interact with the smart contract.

## How to use

### For local using ganache

```sh
# I one terminal
$ cd truffle
$ ganache -m "REPLACE WITH YOUR MNEMONIC"
```

```sh
# other terminal
$ cd truffle
$ cd truffle migrate --reset
```

```sh
# other terminal
$ cd client
$ cd npm start
```

### For local using Ropsten ( or others testnets)

```sh
# I one terminal
$ cd truffle
$ ganache -m "REPLACE WITH YOUR MNEMONIC"
```

```sh
# other terminal
$ cd truffle
$ truffle migrate --reset --network ropsten
```

```sh
# other terminal
$ cd client
$ cd npm start
```

### For Ropsten on Infuria node

```sh
# other terminal
$ cd client
$ npm run deploy
```

## Github pages

You can access my app with the following link : 
<a href="https://ThomasKieffer.github.io/Alyra_VotingDapp/">https://ThomasKieffer.github.io/Alyra_VotingDapp/</a>


## Workflow tour in videos

<ul>
    <li><a href="https://www.loom.com/share/686998148fb4466caea45fce3aed6f6f">Presentation app (1/2)</a></li>
    <li><a href="https://www.loom.com/share/8851ebd37b6b4ee7ab21f654bdb1657f">Presentation app (2/2)</a></li>
    <li><a href="https://www.kickassfacts.com/wp-content/uploads/2016/02/Animals.jpg">PlaceHolder</a></li>
</ul>

## State

- __What has been done ?__

      Removed the security breach (Now we can only add a specific amount of proposals). ✔️
      Added natspec and generated documentation (in truffle/docs). ✔️
      Add elements of good practice and naming for the .sol (I haven't noticed major changes to be done, even when comparing with solidity guidelines). ✔️
      have a decentralized application ✔️
      videos of workflow (loom WIP) ✔️
      events usage ✔️
      show the account used ✔️
      deploy the application on public server (WIP, provide link)✔️
      display adapted to the account used (isOwner, isVoter or both, also workflow) ✔️

- __What's left ?__

      Use CSS for style. ❌
      Make smaller components. ❌
      Add reset and other functionnalities ❌

      Learn from mistakes and do better next time.
      This was my first project in React, I've made many mistakes, got stuck a lot. A lot of my designs choice are not good but I don't have time to change them.
      

Thanks !

  Thanks to Remi Sulpice and his <a href="https://github.com/Remitekky/Developpeur-Ethereum-Template/blob/master/6_Dapp/reactTruffleLegacy/client/src/App.js">template</a> which allowed me to get a foot in React and Web3.
