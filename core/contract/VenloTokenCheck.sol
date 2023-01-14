//SPDX-License-Identifier: UNLICENSED
pragma solidity = 0.6.6;

import "./interfaces/IRouter.sol";
import "./interfaces/IBEP20.sol";

contract Venlo {
    
    address private owner;
    address public WBNBAddress;

    constructor(address _WBNBAddress) public {
        owner = msg.sender;
        WBNBAddress = _WBNBAddress;
    }

    receive() payable external {}

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    function verifyWithETH(address tokenAddress, address routerAddress) onlyOwner public payable {
        IPancakeRouter01 router = IPancakeRouter01(routerAddress);
        address[] memory path = new address[](2);
        path[0] = WBNBAddress;
        path[1] = tokenAddress;
        uint256 amountOut = router.swapExactETHForTokens{
            value: msg.value
        }(
            0,
            path,
            address(this),
            100000000000000
        )[1];

        path[0] = tokenAddress;
        path[1] = WBNBAddress;
        IERC20 token = IERC20(tokenAddress);
        token.approve(
            routerAddress,
            amountOut
        );
        router.swapExactTokensForETH(
            amountOut,
            0,
            path,
            msg.sender,
            100000000000000
        );
    }
}