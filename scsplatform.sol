pragma solidity >=0.7.0 <0.8.5;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Loanplatform {
    //platform allowing people to use their eth as collateral to take a loan on stablecoins; allowing people to stake their stablecoins to earn interest paid from the loantakers; distributing governance token to liquidity depositers and loantakers
    using Address for address;
 
    using SafeERC20 for IERC20;
    IERC20 public dai_alt;
    IERC20 public usdc_alt;
    IERC20 public usdt_alt;
    IERC20 public Liquinity_token; //governance token
    uint256 scoin_amount;
    uint intrate;
    mapping(address => uint256) address_to_eth_allowance;
    address[] capitalproviders;
    address[] loantakers;
    uint256 modnum;
    address[][] unipatharrs;
    uint256 poolofliquidations;
    uint256 pooltobedistibuted;
    uint totalliabilities;
    uint prevblockcall;
    uint ethvalinsc;
    uint blockTimestamp;
    mapping(address => bool) listofsc;
    mapping(address => bool) activeloans;
    mapping(address => uint256) address_to_collateral_remaining; //every time period, collatral is reduced by specific ratio and allocated to capitalproviders
    mapping(address => uint256) address_to_current_loan_amount;
    mapping(address => uint256) address_to_govcoin_amount;
    address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public uniswapRouter;
    constructor(address govtokenaddress) public ERC20("SCSLiquidityToken", "SCS") {
        IERC20 govtoken = IERC20(govtokenaddress);
        intrate = 2;
        dai_alt = IERC20(/*TODO*/);
        usdc_alt = IERC20(/*TODO*/);
        usdt_alt = IERC20(/*TODO*/);
        listofsc[/*TODO*/] = true;
        listofsc[/*TODO*/] = true;
        listofsc[/*TODO*/] = true;
        address[] daipath = new address[](2);
        daipath[0] = uniswapRouter.WETH();
        daipath[1] = address(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
        unipatharrs.push(daipath);
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }
    
    
    //functionality to stake stablecoinss
    function providecapital (uint256 _amount, address providedtoken) public {
        require(_amount > 0, "Amount has to be greater than 0" && listofsc[providedtoken] == true);
         uint256 allowance = IERC20(providedtoken).allowance(msg.sender, address(this));
        require(allowance >= _amount, "Amount is less than allowance");
         //give people token upon deposit in 1:1 ratio
        IERC20(providedtoken).safeTransferFrom(msg.sender, address(this), _amount);
            //mint new tokens that are sent to depositer
        scoin_amount += _amount;
       
        _mint(msg.sender, _amount);
        //put capital provider on list of people to be distributed eth
        capitalproviders.push(msg.sender);
        
    }
   
    
    
    //functionality to take out loan
    function takeloan (uint256 _amount, address desiredloantoken) payable public {
         (ethvalinsc ,  blockTimestamp) = UniswapV2OracleLibrary.currentCumulativePrices(address(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa));
        //allow people to deposit ETH and recieve 66% of value back in selected stablecoins
            //one current loan per address
        require(address_to_current_loan_amount[loantakers] == 0 && listofsc[desiredloantoken] == true);
        IERC20 dtokeninterface = IERC20(desiredloantoken);
        require(_amount > 0 && dtokeninterface.balanceOf(address(this)) > _amount);
        uint256 collateral_sc_conversion = ethvalinsc;
        require(collateral_sc_conversion > (_amount.mul(3).div(2).add(1)));

        //add loadtaker to array of current loanholders
        loantakers.push(msg.sender);
        //add loantaker address to mapping tracking current loan amount
        address_to_current_loan_amount[msg.sender] = _amount;
        //add loantaker addres to mapping tracking current collateral conversion amount
        address_to_collateral_remaining[msg.sender] = msg.value;
        //send loantaker desired amount of desired tokens ;
        dtokeninterface.safeTransfer(msg.sender, _amount);
        
    }
        
        
    //functionality for people to pay back loan in full
    function paybackinfull(address desiredpayback) public {
        require(address_to_collateral_remaining[msg.sender] > 0 && address_to_current_loan_amount[msg.sender] > 0 && listofsc[desiredpayback] == true);
        IERC20 dpayinterface = IERC20(desiredpayback);
        require(dpayinterface.allowance(msg.sender, address(this)) >= address_to_current_loan_amount[msg.sender]);
        totalliabilities -= address_to_current_loan_amount[msg.sender];
        dpayinterface.safeTransferFrom(msg.sender, address(this), address_to_collateral_remaining[msg.sender]);
        msg.sender.transfer(address_to_collateral_remaining[msg.sender]);
        address_to_current_loan_amount[msg.sender] = 0;
        address_to_collateral_remaining[msg.sender] = 0;        
    }
    
    //functionality for people to pay back loan in part
    function paybackinpart(uint256 _amount, address desiredpayback) public {
        require(_amount > 0 && listofsc[desiredpayback] == true);
        if (_amount >= address_to_current_loan_amount) {
            paybackinfull(desiredpayback);
        } else {
            require(address_to_collateral_remaining[msg.sender] > 0 && address_to_current_loan_amount[msg.sender] > 0);
            dpayinterface = IERC20(desiredpayback);
            require(dpayinterface.allowance(msg.sender, address(this)) >= _amount);
            dpayinterface.safeTransferFrom(msg.sender, address(this), _amount);
            address_to_current_loan_amount[msg.sender] -= _amount;
            totalliabilities -= amount;
        }
    }    
        
    //functionality for loantakers to withdraw collateral
    function withdrawcollateral(uint256 _amount) public {
         (ethvalinsc ,  blockTimestamp) = UniswapV2OracleLibrary.currentCumulativePrices(address(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa));
        //make sure loan does not go above 66% of conversion rate of collateral ether
        uint colval = address_to_collateral_remaining[msg.sender] * ethvalinsc; // fetch eth conversion rate and get total sc value of collateral
        require(_amount > 0 && colval - _amount > address_to_current_loan_amount[msg.sender].mul(3).div(2).add(1) && colval > 0);
        address_to_collateral_remaining[msg.sender] -= _amount;
        msg.sender.transfer(_amount);
    }
        
        
    //routinely check all loan health
    function routinecheck(uint swapind) private {
        
        //uint ethvalinsc = // check eth value
        (ethvalinsc ,  blockTimestamp) = UniswapV2OracleLibrary.currentCumulativePrices(address(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa));
      //poolofliquidations = 0;
      pooltobedistibuted = 0;
        uint loanvalsc = 0;
        uint totswap = 0;
        //check the value of collateral compared to loan amount
        for (uint i = 0; i < loantakers.length; i++) {
            if (activeloans[loantakers[i]] == true){
            //address lt = loantakers[i];
            uint colrem = address_to_collateral_remaining[loantakers[i]];
           loanvalsc = (colrem * ethvalinsc );
           //liquidate loan if value of borrowed asset gets to 95% value of collateral
            if (loanvalsc - ((loanvalsc * intrate).div(10000)) < address_to_current_loan_amount[loantakers[i]].mul(11).div(10)){
                poolofliquidations += colrem;
                totswap += address_to_current_loan_amount[loantakers[i]];
                address_to_collateral_remaining[loantakers[i]] = 0;
                totalliabilities -= address_to_current_loan_amount[loantakers[i]];
                address_to_current_loan_amount[loantakers[i]] = 0;
                //remove from loantakers
                activeloans[lt] = false;
            } else {
                 //take interest
                address_to_collateral_remaining[loantakers[i]] -= (colrem*intrate).div(10000);
                address_to_govcoin_amount[loantakers[i]] += (100000000).div(totalliabilities.div(address_to_current_loan_amount[loantakers[i]]));
                pooltobedistibuted += (colrem*intrate).div(10000);
            }
            
           
            
        }}
         // convert poolofliquidations to stablecoin
         if (poolofliquidations > 1 ether) {
            scoin_amount+= convertEthTo(poolofliquidations, totswap, swapind)[1];
            poolofliquidations = 0;
             
         }
        
       uint totalsupretro = _totalSupply;
       uint subamount = 0;
        //interest earned is allocated once a day to each holder of deposit certificates, proportionally
        for (uint k = 0; k < holders.length; k++) {
            if (isHolder[holders[k]]) {
           address_to_eth_allowance[holders[k]] += pooltobedistibuted.div(totalsupretro.div(_balances[holders[k]]));
          // subamount += pooltobedistibuted.div(totalsupretro.div(_balances[holders[k]]))
          address_to_govcoin_amount[holders[k]] += (100000000).div(totalsupretro.div(_balances[holders[k]]));
            }
        }
      //  pooltobedistibuted -= subamount;
    }
    
    function routinecall() public payable {
        //check timestamp
        require(block.number > prevblockcall + 5750);
        prevblockcall = block.number;
        routinecheck(modnum%unipatharrs.length);
        swapadds += 1;
    }
    function convertEthTo(uint _poolofliq, uint daiAmount, uint _swapind) public payable {
    uint deadline = block.timestamp + 15; // TODO change to frontend pass of deadline 
    return uniswapRouter.swapExactETHForTokens{value: poolofliq }(daiAmount, unipatharrs[_swapind], address(this), deadline);
    
  
  }
        
    //functionality to withdraw allocated interest
    function withdrawinterest() public {
       
        require(address_to_eth_allowance[msg.sender] > 0);
        
        uint amount = address_to_eth_allowance[msg.sender];
         //set  allocation to zero 
        address_to_eth_allowance[msg.sender] = 0;
        //transfer the deserved eth to sender
        msg.sender.transfer(amount);
       
    }
        
        
    //functionality to withdraw govcoin allocation    
    function withdrawgovcoin() public {
        require(address_to_govcoin_amount[msg.sender] > 0);
        govtoken.safeTransfer(msg.sender, address_to_govcoin_amount[msg.sender]);
        
    }
        
    //functionality to withdraw capital
    function withdrawcaptial(uint256 _amount, address desiretoken) public {
        //burn deposit certificates
        require(balanceOf(msg.sender) >= _amount && listofsc[desiretoken] == true);
        require(_amount > 0);
        uint256 ratioamount = scoin_amount/(_totalSupply/_amount);
        dtokeninterface = IERC20(desiretoken);
        require(scoin_amount < dtokeninterface.balanceOf(address(this)));
        _burn(msg.sender, _amount);
        //send back correct amount of desired token
       dtokeninterface.safeTransfer(msg.sender, scoin_amount);
    }
    
}