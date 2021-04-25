import React from 'react';
import Web3 from 'web3';
import abi from './abicode.js'
import detectEthereumProvider from '@metamask/detect-provider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: null,
      address: '0xF04ae675563471C4a3483ECd6d89E131BB082a6f',
      providewindow: false,
      coin: null,
      amountToSend: 0,
      tokenaddress: 'ERROR',
      totalscd: 0,
      curtotusdt: 0,
      curtotusdc: 0,
      curtotdai: 0,
      usdequiv: 0,
      ethowed: 0,
      scowed: 0
    };
    this.devtesting = this.devtesting.bind(this)
    this.provideUSDTwindow = this.provideUSDTwindow.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.provideliq = this.provideliq.bind(this);
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

  //DONE  connect wallet

  //TODO design page

  //TODO show the balance of each stablecoin and outstanding loans
      //TODO FETCH BALANCES FROM CONTRACT ON WALLET CONNECTION
  //TODO  show the total amount of stablecoins staked 
      //TODO FETCH BALANCES FROM CONTRACT ON WALLET CONNECTION

  //TODO  allow access to each method of the contract
provideUSDTwindow(b, tokenaddress1) {

this.setState({providewindow: true, coin: b, tokenaddress: tokenaddress1});

}
async provideliq(amount, provtokenaddress) {
  
  const account = await this.getCurrentAccount();
var coolNumber;
  window.contract.methods.providecapital(this.state.amountToSend, this.state.tokenaddress).send({ from: account })
  .then(a => {coolNumber = a; console.log(coolNumber)})
  .catch(e => console.log(e)) 
  console.log(coolNumber);
  console.log(this.state.amountToSend)
} 

setAmount(event) {
  this.setState({amountToSend: event.target.value})
}

  

  
 
  render() {
  return (
    <div className="App">
  <div id='titlecard'>YieldSwap <span id='betatag'>BETA</span></div>
  <div id='totaldep'>Total stablecoin deposits <span id='tdnum'>{this.state.totalscd}</span></div>
  <div id='status'>Not</div>
 {this.state.providewindow ? <div id='provliqwindow'>{this.state.coin}
   <input value={this.state.amountToSend} onChange={this.setAmount}></input>
   <button id='sendtransaction' onClick={this.provideliq}>Send Transaction</button>
 </div> : null}
  <button onClick={this.devtesting.bind(this)}>log account</button>
  <div id='curavliq'>Current available liquidity
  <div>USDT <span id='curusdt'>{this.state.curtotusdt}</span> imghere <button onClick={this.provideUSDTwindow.bind(this, ['USDT', '0xdAC17F958D2ee523a2206206994597C13D831ec7'])}>Provide USDT</button></div> 
  <div>USDC <span id='curusdc'>{this.state.curtotusdc}</span> imghere <button onClick={this.provideUSDTwindow.bind(this, ['USDC', 'TODO' /*TODO ADD IN USDC CONTRACT ADDRESS*/ ])}>Provide USDC</button></div>
  <div>DAI  <span id='curdai'>{this.state.curtotdai}</span> imghere  <button onClick={this.provideUSDTwindow.bind(this, ['DAI', 'TODO' /*TODO ADD IN DAI CONTRACT ADDRESS*/ ])}>Provide DAI</button></div>
  </div>
   
   <div id='userprovidedliq'>Your Liquidity
   <div>YieldSwap Tokens <span id='curys'>{this.state.usdequiv}</span> imghere </div> 
  </div>
   <div id='userloans'>Your Loans 
   <div>Ethereum Collateral <span id='ethowed'>{this.state.ethowed}</span> imghere </div> 
   <div>Tokens Owed <span id='scowed'>{this.state.scowed}</span> imghere </div> 
    </div>
  
    </div>
  );
}}

export default App;

