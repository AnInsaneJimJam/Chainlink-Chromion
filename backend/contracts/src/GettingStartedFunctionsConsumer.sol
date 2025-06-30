// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts@1.4.0/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts@1.4.0/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts@1.4.0/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {Will} from "./will.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/resources/link-token-contracts/
 */

/**
 * @title GettingStartedFunctionsConsumer
 * @notice This is an example contract to show how to make HTTP requests using Chainlink
 * @dev This contract uses hardcoded values and should not be used in production.
 */
 
contract GettingStartedFunctionsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    string public s_lastResult;

    address public willContractAddress;
    mapping(bytes32 => address) public s_requestToTestator; // Maps request ID to the testator being checked


    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);
    error OnlyWillContract();

    // Event to log responses
    event Response(bytes32 indexed requestId, address indexed testator, string result, bytes err);

    // Router address - Hardcoded for Sepolia
    // Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;

    // JavaScript source code
    string source = string.concat(
    "const name = args[0];",
    "const yob = args[1];",
    "const url = 'https://database-guew-git-master-yash-agrawal-s-projects.vercel.app/verify?name=' + name + '&yob=' + yob;",
    "const response = await Functions.makeHttpRequest({",
    "  url: url,",
    "  method: 'GET'",
    "});",
    "if (response.error) {",
    "  throw new Error('API request failed');",
    "}",
    "const result = response.data.result;",
    "return Functions.encodeUint256(result);"
);
    //Callback gas limit
    uint32 gasLimit = 300000;

    // donID - Hardcoded for Sepolia
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;

    // State variable to store the returned character information

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    modifier onlyWillContract() {
        if (msg.sender != willContractAddress) revert OnlyWillContract();
        _;
    }

    function setWillContract(address _willAddress) external onlyOwner {
        willContractAddress = _willAddress;
    }

    /**
     * @notice Called by the Will contract to start the death verification process.
     * @param _testator The address of the testator whose status is being checked.
     * @param _subscriptionId The ID for the Chainlink subscription.
     * @param _args The arguments [name, yearOfBirth] to pass to the API request.
     * @return requestId The ID of the request.
     */
    function requestDeathVerification(
        address _testator,
        uint64 _subscriptionId,
        string[] calldata _args
    ) external onlyWillContract returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (_args.length > 0) req.setArgs(_args);

        s_lastRequestId = _sendRequest(req.encodeCBOR(), _subscriptionId, gasLimit, donID);
        s_requestToTestator[s_lastRequestId] = _testator; // Store the link between request and testator

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }

        s_lastResponse = response;
        s_lastError = err;

        uint256 status = abi.decode(response, (uint256));
        address testator = s_requestToTestator[requestId];

        if (willContractAddress != address(0)) {
            bool wasInitiationCorrect = (status == 1);
            Will(willContractAddress).resolveDispute(testator, wasInitiationCorrect);
        }

        emit Response(requestId, testator, string(response), err);
        delete s_requestToTestator[requestId];
}
}