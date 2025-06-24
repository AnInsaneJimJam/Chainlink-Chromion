// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {CCIPReceiver} from "@chainlink/contracts-ccip/contracts/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";

interface ISmartWallet {
    function transfer(address payable to, uint256 amount) external;
    function withdraw(uint256 amount) external;
    function getBalance() external view returns (uint256);
    function deposit() external payable;
}

contract LogicContractReceiver is CCIPReceiver {
    IRouterClient public immutable ccipRouter;
    address public immutable mainCoordinator; // The Ethereum-side main coordinator
    uint64 public immutable ethereumChainSelector;

    event ExecutedAction(
        string action,
        address indexed user,
        address indexed wallet,
        address indexed to,
        uint256 amount
    );

    constructor(address _router, address _coordinator, uint64 _ethSelector) CCIPReceiver(_router) {
        ccipRouter = IRouterClient(_router);
        mainCoordinator = _coordinator;
        ethereumChainSelector = _ethSelector;
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (
            string memory action,
            address user,
            address wallet,
            address to,
            uint256 amount
        ) = abi.decode(message.data, (string, address, address, address, uint256));

        emit ExecutedAction(action, user, wallet, to, amount);

        ISmartWallet sw = ISmartWallet(wallet);

        if (keccak256(bytes(action)) == keccak256("transfer")) {
            sw.transfer(payable(to), amount);
        } else if (keccak256(bytes(action)) == keccak256("withdraw")) {
            sw.withdraw(amount);
        } else if (keccak256(bytes(action)) == keccak256("getBalance")) {
            uint256 balance = sw.getBalance();
            _sendBalanceBack(user, balance);
        } else if (keccak256(bytes(action)) == keccak256("deposit")) {
            // Informational only — deposit must be handled by UI
        } else {
            revert("Unknown action");
        }
    }

    function _sendBalanceBack(address user, uint256 balance) internal {
        bytes memory responseData = abi.encode(user, ethereumChainSelector, balance);

        Client.EVM2AnyMessage memory responseMsg = Client.EVM2AnyMessage({
            receiver: abi.encode(mainCoordinator),
            data: responseData,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.GenericExtraArgsV2({
                    gasLimit: 200_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(0) // Native gas token (ETH, MATIC, etc.)
        });

        uint256 fee = ccipRouter.getFee(ethereumChainSelector, responseMsg);
        require(address(this).balance >= fee, "Insufficient native token for CCIP response");

        ccipRouter.ccipSend{value: fee}(ethereumChainSelector, responseMsg);
    }

    receive() external payable {}
}