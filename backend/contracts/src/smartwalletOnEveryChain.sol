// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title SmartWallet
 * @dev A vault per user, with CCIP-controlled actions. Supports deposits initiated from the frontend.
 */
contract SmartWallet {
    // --- State Variables ---

    address public immutable owner;
    address public logicContract;

    // --- Events ---

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event LogicContractSet(address indexed newLogicContract);

    // --- Modifiers ---

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || msg.sender == logicContract, "Caller not authorized");
        _;
    }

    // --- Constructor ---

    constructor() {
        owner = msg.sender;
    }

    // --- User Deposit Function ---

    /**
     * @dev Called by the user from the frontend to deposit native cryptocurrency.
     */
    function deposit() external payable {
        require(msg.value > 0, "Must send some ETH");
        emit Deposit(msg.sender, msg.value);
    }

    // --- Core Actions ---

    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        _sendValue(payable(owner), amount);
        emit Withdraw(owner, amount);
    }

    function transfer(address payable to, uint256 amount) external onlyAuthorized {
        require(to != address(0), "Invalid recipient");
        require(address(this).balance >= amount, "Insufficient balance");
        _sendValue(to, amount);
        emit Transfer(msg.sender, to, amount);
    }

    function setLogicContract(address _logicContract) external onlyOwner {
        require(_logicContract != address(0), "Invalid logic contract");
        logicContract = _logicContract;
        emit LogicContractSet(_logicContract);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // --- Internal Transfer Utility ---

    function _sendValue(address payable to, uint256 amount) internal {
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }

    // --- Fallback to Accept ETH ---

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
