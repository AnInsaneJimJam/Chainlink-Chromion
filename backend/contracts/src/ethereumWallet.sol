// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IRouterClient} from "@chainlink/contracts-ccip@1.6.0/contracts/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts@1.4.0/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip@1.6.0/contracts/libraries/Client.sol";

contract MainCoordinator is OwnerIsCreator {
    error NotEnoughNative(uint256 balance, uint256 required);

    struct WalletInfo {
        address wallet;
        address logicContract;
    }

    mapping(address => mapping(uint64 => WalletInfo)) public userWallets;

    IRouterClient private s_router;

    event WalletRegistered(address indexed user, uint64 chain, address wallet, address logic);
    event CrossChainActionInitiated(
        address indexed user,
        uint64 indexed destChain,
        string action,
        address to,
        uint256 amount
    );
    event MessageSent(
        bytes32 indexed messageId,
        uint64 indexed destinationChainSelector,
        address receiver,
        string action,
        address to,
        uint256 amount,
        address feeToken,
        uint256 fees
    );
    event ReceivedBalance(address indexed user, uint64 chainSelector, uint256 balance);

    constructor(address _router) {
        s_router = IRouterClient(_router);
    }

    function registerWalletForUser(
        address _user,
        uint64 _chainSelector,
        address _wallet,
        address _logicContract
    ) external onlyOwner {
        userWallets[_user][_chainSelector] = WalletInfo({
            wallet: _wallet,
            logicContract: _logicContract
        });
        emit WalletRegistered(_user, _chainSelector, _wallet, _logicContract);
    }

    function requestAction(
        uint64 destChainSelector,
        string calldata action,
        address to,
        uint256 amount
    ) external payable returns (bytes32 messageId) {
        WalletInfo memory info = userWallets[msg.sender][destChainSelector];
        require(info.wallet != address(0), "Wallet not registered");

        // Prepare the CCIP message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(info.logicContract),
            data: abi.encode(action, msg.sender, info.wallet, to, amount),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.GenericExtraArgsV2({
                    gasLimit: 200_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(0) // Use native gas token
        });

        uint256 fees = s_router.getFee(destChainSelector, evm2AnyMessage);

        if (address(this).balance < fees) {
            revert NotEnoughNative(address(this).balance, fees);
        }

        // Send message using native token
        messageId = s_router.ccipSend{value: fees}(destChainSelector, evm2AnyMessage);

        emit MessageSent(
            messageId,
            destChainSelector,
            info.logicContract,
            action,
            to,
            amount,
            address(0), // native token used
            fees
        );

        emit CrossChainActionInitiated(msg.sender, destChainSelector, action, to, amount);
    }

    // callback from receiver contract
    function receiveBalance(
        address user,
        uint64 chainSelector,
        uint256 balance
    ) external {
        require(msg.sender == tx.origin || msg.sender == address(s_router), "Unauthorized");
        emit ReceivedBalance(user, chainSelector, balance);
    }

    // To receive ETH (or native token)
    receive() external payable {}
}
