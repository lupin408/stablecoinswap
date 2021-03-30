pragma solidity <=0.7.0 <0.8.0


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Loanplatform {
    //platform allowing people to use their eth as collateral to take a loan on stablecoins; allowing people to stake their stablecoins to earn interest paid from the loantakers; distributing governance token to liquidity depositers and loantakers
    using Address for address;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public dai_alt;
    IERC20 public usdc_alt;
    IERC20 public usdt_alt;
    IERC20 public Liquinity_token; //governance token
    constructor(address _token) public ERC20("SCSLiquidityToken", "SCS") {
        token = IERC20(_token); //depository token (to be pre-launched)
        dai_alt = IERC20(/*TODO*/);
        usdc_alt = IERC20(/*TODO*/);
        usdt_alt = IERC20(/*TODO*/);
    }
    mapping(address => uint256) address_to_eth_allowance;
    address[] capitalproviders;
    
    //functionality to stake stablecoinss
    function providecapital (uint256 _amount, address providedtoken) public {
        require(_amount > 0, "Amount has to be greater than 0");
         uint256 allowance = token.allowance(msg.sender, providedtoken);
        require(allowance >= amount, "Amount is less than allowance");
         //give people token upon deposit in 1:1 ratio
        IERC20(providedtoken).safeTransferFrom(msg.sender, address(this), _amount);
            //mint new tokens that are sent to depositer
        mint(msg.sender, _amount);
        
    }
       
        
    
    //functionality to take out loan
    function takeloan (uint256 _amount, address desiredloantoken) payable public {
        
    }
        //allow people to deposit ETH and recieve 66% of value back in selected stablecoins
        //give token to loantaker (proportionally) that is burned upon repayment of loan
        //allow people to pay back loan in full
        //allow people to pay back loan in part
        
        
        
    //routinely check all loan health
        //check the value of collateral compared
        //liquidate loan if value of borrowed asset gets to 95% value of collateral
            //convert to stablecoin that loan was taken out in
        //interest earned is allocated once a day to each holder of deposit certificates, proportionally
        
        
        
    //functionality to withdraw allocated interest
        //burn dposit certificates
        
        
        
    //functionality to withdraw capital
    function withdrawcaptial(uint256 _amount, address desiretoken) public {
        //burn deposit certificates
        burn(msg.sender, _amount)
        //send back correct amount of desired token
        IERC20(desiretoken).safeTransfer(msg.sender, _amount);
    }
    
}