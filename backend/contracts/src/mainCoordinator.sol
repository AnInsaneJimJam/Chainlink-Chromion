// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IRouterClient} from "@chainlink/contracts-ccip@1.6.0/contracts/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip@1.6.0/contracts/libraries/Client.sol";

contract MainCoordinator {
    error NotEnoughNative(uint256 balance, uint256 required);
    error BatchCannotBeEmpty();

    // --- Data Structures ---
    struct DestChainInfo {
        uint64 selector;
        address logicContract;
    }

    // NEW: Struct to group parameters for a single batch transfer
    struct BatchTransfer {
        string destChainName;
        uint256 amount;
        address destChainWallet;
    }

    mapping(string => DestChainInfo) public s_destChainInfo;
    IRouterClient private s_router;

    // Events remain the same...
    event CrossChainActionInitiated(
        address indexed user,
        uint64 indexed destChainSelector,
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
        // Constructor logic remains the same...
        s_destChainInfo["polygon"] = DestChainInfo({
            selector: 16281711391670634445,
            logicContract: 0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd
        });
        s_destChainInfo["avalanche"] = DestChainInfo({
            selector: 14767482510784806043,
            logicContract: 0xE60f79571E7EDba477ff98BAdeE618b5605DF7aE
        });
    }

    /**
     * @notice REFACTORED: Initiates a BATCH of cross-chain transfers.
     * @param _transfers An array of BatchTransfer structs, each containing the details for one transfer.
     * @param _to The single target address for all transfers.
     * @return messageIds An array of CCIP message IDs.
     */
    function requestActionBatch(
        BatchTransfer[] calldata _transfers,
        address _to
    ) external payable returns (bytes32[] memory messageIds) {
        uint256 batchSize = _transfers.length;
        if (batchSize == 0) {
            revert BatchCannotBeEmpty();
        }

        string memory action = "transfer";

        // --- 1. Calculate Total Fees ---
        uint256 totalFees = 0;
        for (uint256 i = 0; i < batchSize; i++) {
            BatchTransfer calldata transferItem = _transfers[i];
            DestChainInfo storage destChain = s_destChainInfo[transferItem.destChainName];
            require(destChain.logicContract != address(0), "Unsupported chain in batch");

            Client.EVM2AnyMessage memory tempMessage = _buildTransferMessage(
                destChain.logicContract,
                action,
                _to,
                transferItem.amount,
                transferItem.destChainWallet
            );
            totalFees += s_router.getFee(destChain.selector, tempMessage);
        }

        // --- 2. Send Messages ---
        messageIds = new bytes32[](batchSize);
        for (uint256 i = 0; i < batchSize; i++) {
            BatchTransfer calldata transferItem = _transfers[i];
            DestChainInfo storage destChain = s_destChainInfo[transferItem.destChainName];
            
            Client.EVM2AnyMessage memory evm2AnyMessage = _buildTransferMessage(
                destChain.logicContract,
                action,
                _to,
                transferItem.amount,
                transferItem.destChainWallet
            );
            
            uint256 individualFee = s_router.getFee(destChain.selector, evm2AnyMessage);
            messageIds[i] = s_router.ccipSend{value: individualFee}(destChain.selector, evm2AnyMessage);

            emit MessageSent(
                messageIds[i], destChain.selector, destChain.logicContract, action, _to, transferItem.amount, address(0), individualFee
            );
            emit CrossChainActionInitiated(msg.sender, destChain.selector, action, _to, transferItem.amount);
        }
    }
    
    // Helper function specific for the new batch transfer to keep code clean
    function _buildTransferMessage(
        address _logicContract,
        string memory _action,
        address _to,
        uint256 _amount,
        address _destChainWallet
    ) internal view returns (Client.EVM2AnyMessage memory) {
         return Client.EVM2AnyMessage({
            receiver: abi.encode(_logicContract),
            // The order of abi.encode matters!
            data: abi.encode(_action, msg.sender, _destChainWallet, _to, _amount),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.GenericExtraArgsV2({ gasLimit: 200_000, allowOutOfOrderExecution: true })
            ),
            feeToken: address(0)
        });
    }

    // The generic, single requestAction function and its helper can remain if you need them
    // For simplicity, I've removed them here, but you can keep them if you need both functionalities.
    
    // --- Callback and Fallback Functions ---
    function receiveBalance(address user, uint64 chainSelector, uint256 balance) external {
        require(msg.sender == address(s_router), "Caller is not the CCIP Router");
        emit ReceivedBalance(user, chainSelector, balance);
    }

    receive() external payable {}
}