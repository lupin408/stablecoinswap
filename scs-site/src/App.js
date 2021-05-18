import React from 'react';
import Web3 from 'web3';
import abi from './abicode.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: null,
      address: '0xF04ae675563471C4a3483ECd6d89E131BB082a6f',
      providewindow: false,
      coin: null,
      amountToSend: 'unknown',
      tokenaddress: 'ERROR',
      totalscd: ' CONNECT TO BINANCE SMART CHAIN',
     
      responseduplicate: 1123919,
      usdequiv: 6.3,
      ethowed: 8.332,
      scowed: '7,993'
    };
    this.devtesting = this.devtesting.bind(this)
    this.provideUSDTwindow = this.provideUSDTwindow.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.provideliq = this.provideliq.bind(this);
  }
  
  componentDidMount(b) {
    //var provider;
var g = this;
    if (window.web3 == undefined) {

    } else {
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
      window.contract.methods.balanceOf('0x5ad70C5d4ac286F87bAdA7bbe6E73fEAB1f0421f').call()
.then(ab => {g.setState({totalscd: ab/1000000000000000000})})
  }
  
  function updateStatus(status) {
      const statusEl = document.getElementById('status');
      statusEl.innerHTML = status;
      console.log(status);
  }
  var abi2 =  JSON.stringify(abi.abi)
  console.log(abi2, typeof abi2)
  
  async function loadContract() {
    
    return await new window.web3.eth.Contract(JSON.parse(abi2), '0x5ad70C5d4ac286F87bAdA7bbe6E73fEAB1f0421f');
   
} 
load();
window.web3.eth.net.getNetworkType()
.then(a => {this.setState({amountToSend: a})});


  }
 
}
  

  async  getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}
  async devtesting() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
  }
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
  //0x5ad70C5d4ac286F87bAdA7bbe6E73fEAB1f0421f
  // ^ ADDRESS OF FEMT 
 
provideUSDTwindow(b, tokenaddress1) {

this.setState({providewindow: true, coin: b, tokenaddress: tokenaddress1});

}
async provideliq(amount, provtokenaddress) {
 

  const account = await this.getCurrentAccount();
var coolNumber;
console.log(window.contract)
  window.contract.methods.gettokens().send({ from: account })
  .then(a => {coolNumber = a; console.log(coolNumber)})
  .catch(e => console.log(e)) 
  console.log(coolNumber);
  console.log(this.state.amountToSend)
} 

setAmount(event) {
  this.setState({amountToSend: 0})
}

  

  
 
  render() {
  return (
    <div className="App">
     
  <div id='titlecard'><b>Fuck Elon Musk</b>  <span id='betatag'>Token</span></div>
  <div id='totaldep'>Amount left to claim: <span id='tdnum'>{this.state.totalscd}</span></div>
  <div id='status'></div>
  <div id='ticker'>THIS WEBSITE IS TEMPORARY. WE HAD TO LAUNCH THE TOKEN EARLIER THAN WE DESIRED.  REDISIGN SOON</div>
  <div id='introfemt'><div id='introtitle'>Purpose</div>This project is by and for all of the Blockchain Developers who have given their lives to advancing the industry that Elon Musk is making a mockery of. The purpose of the <b>Fuck Elon Musk</b> Token is to offset the fallout from Elon Musk's damage to the environment and the cryptocurrency space. Elon Musk, a narcissist who will scream "aspergers" to absolve himself of any feelings of guilt, didn't like that there was a nascent industry at the forefront of tech (cryptocurrency), that he had ignored and dismissed for years, and therefore had proceeded without him. This man - who had cemented himself at the forefront of space exploration and electric transportaion - couldn't stand that he wasn't at the face of this other industry that was getting attention. So, naturally, like any evil, narcissistic sociopath would do, Elon thrust himself into the cryptocurrency space with the grace of a <b>down-sydrome drunken rhino in a China shop</b>. This BEP-20 token is being given out to anyone who wishes to claim it until the supply runs out. </div>
  <div id='tokengoals'><div id='goalstitle'>Goals of the project</div>
  
  <div id='goals1'>1) Offest the horrendous damage that Elon has both directly and indirectly caused to the enviorment and countless ecosystems around the globe. This will be done by donating to the Nature Conservancy.</div>
  <div id='goals2'>2) Short Tesla's stock. There is nothing Elon Musk hates more than people who short his stock. This is a fitting course of action, as there is nothing the cryptocurrency community hates more than an egomaniac leading an army of 85IQ Tik-Tok children to zealously push the worst trash possible (DOGE, SHIBA, etc.) in an attempt to conquer the industry he so idiotically dismissed. </div>
  <div id='goals3'>3) Make Elon Musk aware that he is hated by everyone who truly cares about cryptocurrency.</div>
  </div>
  <div id='tokenomics'><div id='tokenomicstitle'>Tokenomics</div>
  
  <div id='tokenomics1'> 1) Tokens are to be distrubuted through this contract (<a href='https://bscscan.com/token/0x5ad70c5d4ac286f87bada7bbe6e73feab1f0421f'>0x5ad70c5d4ac286f87bada7bbe6e73feab1f0421f</a>). There are 1 Trillion tokens, intentionally mirroring the trash that Elon Musk's presence has plagued this industry with. These tokens will be distributed 1 Billion at a time. Anyone is welcome to claim their 1 Billion per address until the entire supply has been given out. </div>
  <div id='tokenomics2'>2) 0.25% of every token transfer will be burned.</div>
  <div id='tokenomics3'>3) 0.125% of every token transfer will get siphoned to our treasury to be donated to the Nature Conservancy.This is a charity that will most help offset Elon Musk's damage, both to local ecoystems and to the environment on a global scale.</div>
  <div id='tokenomics4'>4) 0.125% of every token transfer will get siphoned to our treasury for the purpose of doing rolling 1-month leveraged shorts of Tesla stock. Any returns from leveraged shorting will be donated to the Nature Conservancy.</div>
  <div id='tokenomics5'>5) 10% has been set aside for future use.</div>  </div>
  
  < button id='metamaskbtn' onClick={this.devtesting.bind(this)}>Connect wallet</button>
  <div id='curavliq'><span id='calheader'>Claim your tokens</span>

  <div> <span id='curusdt'>1,000,000,000<img id='femtlogo' src="assets/femtlogo.png" alt="FEMT logo" width='24px'></img> FEMT    per address until supply runs out!</span> <div id='warning'>WILL NOT WORK IF ADDRESS HAS ALREADY CLAIMED</div>  <button id='femtbutton' disabled={this.state.amountToSend !== 'private' || this.state.responseduplicate === 'duplicate'} onClick={this.provideliq}>{this.state.amountToSend !== 'private' ? 'SWITCH TO BSC AND RELOAD' : (this.state.responseduplicate !== 'duplicate' ? 'Get tokens' : 'This IP has already claimed')}</button></div> 

  </div>
   
 <div id='sourcecode1'>
<a href="https://github.com/MGE-Labs/FEMT-BEP20">Source Code</a></div>
<div id='contactinfo'></div> 
<div><a href="https://twitter.com/FEMTokenTeam"><img id='twitlogo' src="assets/twitlo2.png" alt="Twitter logo" width='24px'></img></a>        <a href="https://discord.gg/uFD2hX4e"><img id='disclogo' src="assets/disclogo.png" alt="Discord logo" width='24px'></img></a></div>
  <div id='cr'>&copy; Cryptocurrency Community, 2021</div>
    </div>
  );
}}

export default App;

