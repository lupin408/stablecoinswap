import React from 'react';
import Web3 from 'web3';
import abi from './abicode.js'
import detectEthereumProvider from '@metamask/detect-provider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solidityContract: null,
      provider: null,
      currentAccount: null,
      address: '0xF04ae675563471C4a3483ECd6d89E131BB082a6f'
    };

  }
  
  componentDidMount(b) {
    //var provider;
    async function loadWeb3() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
      }
  }
  
  async function load() {
      await loadWeb3();
      window.contract = await loadContract();
      updateStatus('Ready!');
  }
  
  function updateStatus(status) {
      const statusEl = document.getElementById('status');
      statusEl.innerHTML = status;
      console.log(status);
  }
  var abi2 =  JSON.stringify(abi.abi)
  console.log(abi2, typeof abi2)
  async function loadContract() {
    return await new window.web3.eth.Contract(JSON.parse(abi2), '0xF04ae675563471C4a3483ECd6d89E131BB082a6f');
   
}
load();
  }
  

  async  getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}
  async devtesting() {
    const account = await this.getCurrentAccount();
  var coolNumber;
    window.contract.methods.retrievelodges('ClubhouseBest').send({ value: Web3.utils.toWei('1', 'ether'), from: account })
    .then(a => {coolNumber = a; console.log(coolNumber)})
    .catch(e => console.log(e))
    //console.log(coolNumber);
  } 
  
  getRelativeTime = (d1, d2 = new Date()) => {
    var elapsed = d1 - d2
    var units = {
      year  : 24 * 60 * 60 * 1000 * 365,
      month : 24 * 60 * 60 * 1000 * 365/12,
      day   : 24 * 60 * 60 * 1000,
      hour  : 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000
    }
    var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    for (var u in units) 
      if (Math.abs(elapsed) > units[u] || u === 'second') 
        return rtf.format(Math.round(elapsed/units[u]), u)
        
  }

  //connect wallet

  //show the balance of each stablecoin and outstanding loans
  
  //show the total amount of stablecoins staked

  //allow access to each method of the contract

  

  
 
  render() {
  return (
    <div className="App">
  Hi
  <div id='status'>Not</div>
 
  <button onClick={this.devtesting.bind(this)}>log account</button>
  
    </div>
  );
}}

export default App;

