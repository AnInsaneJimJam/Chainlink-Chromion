// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGettingStartedFunctionsConsumer {
    function requestDeathVerification(
        address _testator,
        uint64 _subscriptionId,
        string[] calldata _args
    ) external returns (bytes32 requestId);
}