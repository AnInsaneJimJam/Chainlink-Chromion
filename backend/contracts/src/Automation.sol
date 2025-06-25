// SPDX-Licence-Identifier:MIT
pragma solidity ^0.8.24;

import {AutomationCompatibleInterface} from "../lib/chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract Automation is AutomationCompatibleInterface{
    uint256 interval;
    uint256 lasttimestamp;
    event depositintervalhascome();

    constructor(uint256 _interval){
        interval=_interval;
        lasttimestamp=block.timestamp;
    }
    function checkUpkeep(bytes calldata) external view override returns (bool, bytes memory){
        bool performupkeepneeded = (block.timestamp-lasttimestamp>interval);
        bytes memory data ="";
        return (performupkeepneeded,data);
    }
    function performUpkeep(bytes calldata performData) external override{
        lasttimestamp=block.timestamp;
        emit depositintervalhascome();
    }
    
}