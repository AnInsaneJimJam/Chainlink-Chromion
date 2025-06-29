# 🪙 InheritChain — Cross-Chain Decentralized Will Execution Protocol

InheritChain is a decentralized, cross-chain inheritance management system that allows a **testator** to create a legally binding, multi-chain digital will, and enables **beneficiaries** to securely claim their inheritance — with **dispute resolution**, **Chainlink-powered truth verification**, and **automated CCIP-based asset transfers** across Ethereum, Polygon, Avalanche, and more.

---

## 🔗 Live on: Sepolia (Primary), Polygon, Avalanche, Base

---

## 📌 Features

* **Smart Will Registry**: Create will with off-chain asset % for privacy and on-chain beneficiary list and willhash-A tamper resistent proof of off chain data.
* **Smart Wallet Deployment**: Deploy vaults on any supported chain to hold testator's assets - managed by ccip.
* **Challenge Window**: A transparent 10-day contestation window to allow dispute of false claims.
* **Automated Finalization**: Uses Chainlink Automation to trigger execution after challenge period.
* **Chainlink Any API**: Fetches from a simulated Government Api and Verifies if the testator has passed away.
* **Chainlink CCIP**: Transfers funds to beneficiaries across chains with just a single call.
* **Multi-party Challenge Protocol**: Stake-based dispute mechanism between beneficiaries.
* **MongoDB-Backed Off-chain Storage**: Efficient off-chain will metadata and asset records.

---

## 🧹 Architecture Overview

```
Frontend (React)
   |
   |----> WillCreator (Sepolia): Creates will → stores metadata in MongoDB → stores hash+beneficiaries on-chain
   |
   |----> SmartWalletManager: Deploys smart wallets on Polygon, Avalanche, Sepolia via contracts
   |
   |----> BeneficiaryDashboard: Shows wills involving the current user
   |
   |----> InheritanceActions:
         - Initiate Inheritance (0.1 ETH stake)
         - Challenge (0.01 ETH)
         - View Countdown / Status
   |
   ↓
Chainlink Automation — execute wills that crossed 10-day window
   ↓
If Challenged → Chainlink Any API → Fetch testator death status
If Not Challenged → CCIP Transfer auto-executes

MongoDB ↔ Backend (Node.js/Express) ↔ Smart Contracts ↔ Chainlink
```

---

## 📝 Inheritance Workflow

1. **Will Creation** (Testator)

   * Creates a will from Sepolia network
   * Will object is stored in **MongoDB** with:

     * Testator address
     * Beneficiary details and allocations
   * On-chain `WillContract` stores the Will hash and beneficiary addresses.

2. **Smart Wallet Deployment**

   * From the `SmartWalletManager`, the testator deploys **smart wallets** (vaults) on multiple chains.
   * These vaults hold assets to be distributed to beneficiaries.
   * Mapping of `chain → smart wallet address` is saved in MongoDB.

3. **Initiation of Inheritance** (Any Beneficiary)

   * A beneficiary starts the inheritance process by staking **0.1 ETH**.
   * Status is set to `PendingExecution`.
   * Timestamp is recorded to enforce the **10-day challenge window**.

4. **Challenge Phase**

   * Any other beneficiary can challenge by staking **0.01 ETH**.
   * The testator can challenge **for free** (auto-cancels the process).
   * Multiple challenges can be made within the 10-day window.

5. **Automation-Triggered Finalization**

   * After 10 days, Chainlink Automation checks each will:

     * If **no challenges**: the 0.1 ETH is returned to initiator and execution begins.
     * If **challenges present**: a **Chainlink Any API call** is triggered.

6. **Verification**

   * Chainlink Any API (external adapter or oracle) checks off-chain truth (e.g., obituary database).

     * If **testator is confirmed deceased**:

       * Will executes.
       * Challengers lose 0.01 ETH each, which is kept by the contract.
     * If **testator is alive**:

       * Initiator loses 0.1 ETH.
       * Challengers split it equally (minus a 0.01 ETH protocol fee).

7. **Cross-Chain Inheritance Execution**

   * `MainCoordinator` on Sepolia initiates a **CCIP message** to each chain.
   * For every destination chain:

     * Encodes a message: `"transfer"`, `wallet`, `to`, `amount`
     * CCIP sends to the `LogicContractReceiver` deployed on that chain.

8. **Receiver-side Logic**

   * On Polygon/Avalanche:

     * `LogicContractReceiver` receives the CCIP message.
     * Extracts target wallet, beneficiary, and amount.
     * Calls `SmartWallet.transfer(to, amount)` — transferring native tokens from vault to the beneficiary.

---

## ♻️ Chainlink Integrations

### ✅ 1. Chainlink CCIP (Cross-Chain Interoperability Protocol)

Used for **cross-chain value + instruction transfer**.

* `MainCoordinator.sol` (Sepolia):

  * Constructs and sends `EVM2AnyMessage`
  * Contains: target chain selector, receiver address, ABI-encoded action

* `LogicContractReceiver.sol` (Polygon, Avalanche):

  * Receives CCIP payload
  * Calls transfer on smart wallet contract on that chain

### ✅ 2. Chainlink Any API

Used to **verify testator death** status off-chain.

* Triggered during `finalizeExecution()` if the will is challenged
* Example API: `https://my-death-check-api.com/isDeceased?address=0x...`
* Oracle verifies off-chain status and returns boolean

### ✅ 3. Chainlink Automation

Used to **trigger `finalizeExecution()`** automatically after 10-day timeout.

* Registered Upkeep watches all `PendingExecution` wills
* Executes logic:

  * No challenge → proceed directly
  * Challenge → trigger Chainlink API
  * Updates will status + starts CCIP transfers

---

## 🧠 Tech Stack

| Layer       | Tools                         |
| ----------- | ----------------------------- |
| Language    | Solidity, JavaScript          |
| Contracts   | Hardhat                       |
| Frontend    | React + Tailwind              |
| Backend     | Node.js + Express             |
| Database    | MongoDB                       |
| Chainlink   | CCIP, Automation, Any API     |
| EVM Chains  | Sepolia, Polygon, Avalanche   |
| Wallet      | MetaMask                      |
| Cross-Chain | CCIP Selector-based Messaging |

---

## 📂 Key Contracts

| Contract                    | Role                                      |
| --------------------------- | ----------------------------------------- |
| `WillRegistry.sol`          | Registers wills, stores on-chain metadata |
| `MainCoordinator.sol`       | Initiates inheritance CCIP requests       |
| `LogicContractReceiver.sol` | Executes instructions on target chains    |
| `SmartWallet.sol`           | Custodial vault per testator per chain    |
| `SmartWalletFactory.sol`    | Deploys smart wallets                     |
| `AutomationManager.sol`     | Chainlink-compatible keeper               |

---

## 🧪 Testing & Deployment

* Hardhat used for local testnet simulation
* Chainlink CCIP tested using Amoy + Fuji + Sepolia networks
* MongoDB Atlas for hosted DB
* Frontend tested with Metamask interaction flow

---

## 🚧 Future Work

* ZK-based private challenge protocol
* NFT-based proof of inheritance
* Dynamic Chainlink Functions integration

---

## 🤝 Contributing

Pull requests welcome! Please ensure PRs target a feature branch and include unit tests for Solidity functions.

---

## 📜 License

MIT
