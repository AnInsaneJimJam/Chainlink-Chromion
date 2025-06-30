# 🪙 InheritChain — A Decentralized Digital Will & Cross-Chain Inheritance Protocol

[![Chainlink Hackathon](https://img.shields.io/badge/Chainlink%20Hackathon-Chrominon%202025-blue)](https://chain.link/hackathon)

## The Problem: The Black Hole of Digital Inheritance

In the digital age, we manage a growing portfolio of valuable assets on various blockchains—cryptocurrencies, NFTs, and other tokens. However, the process of passing these assets to our loved ones after we're gone is a legal and technical minefield.
* **Lost Keys, Lost Fortunes:** If private keys are not successfully transferred, assets are lost forever in the digital void. There is no "forgot password" for a crypto wallet.
* **Legal Uncertainty:** There is no established legal or technical framework to govern the inheritance of digital assets, leading to ambiguity and potential disputes.
* **Cross-Chain Complexity:** Assets are often spread across multiple blockchains (Ethereum, Polygon, Solana, etc.). There is no simple way to execute a will that distributes assets across these disconnected ecosystems.

---

## Our Solution: A Trustless Digital Will

InheritChain is a decentralized, cross-chain inheritance management system that allows a **estator** to create a legally binding, multi-chain digital will, and enables **beneficiaries** to securely claim their inheritance — with **dispute resolution**, **Chainlink-powered truth verification**, and **automated Chainlink CCIP-based asset transfers** across Ethereum, Polygon, Avalanche, and more.


#### 🔗 Live on: Sepolia (Primary), Polygon, Avalanche, Base

---

## 📌 Features

* **Smart Will Registry**: Create will with off-chain asset % for privacy and on-chain beneficiary list and Will Hash- A tamper resistent proof of off chain data.
* **Smart Wallet Deployment**: Deploy vaults on any supported chain to hold testator's assets - managed by Chainlink CCIP.
* **Challenge Window**: A transparent 10-day contestation window to allow dispute of false claims.
* **Automated Finalization**: Uses Chainlink Automation to trigger execution after challenge period.
* **Chainlink Any API**: Fetches from a simulated Government Api and Verifies if the testator has passed away.
* **Chainlink CCIP**: Transfers funds to beneficiaries across chains with just a single call.
* **Multi-party Challenge Protocol**: Stake-based dispute mechanism between beneficiaries.
* **MongoDB-Backed Off-chain Storage**: Efficient off-chain will metadata and asset records.
* **Automatic Tweets**: Sends automatic posts to X, keeping testators informed and reassured.
---

##  Architecture Overview

[![F5wHciJ.md.png](https://iili.io/F5wHciJ.md.png)](https://freeimage.host/i/F5wHciJ)

🔗[Link to Excalidraw](https://excalidraw.com/#json=ohqpHLVcX-ZKoWl3vF74V,_pswWhHsVeIwYllC_q2PlQ)

Our system is a hybrid smart contract architecture that leverages the strengths of both on-chain logic and off-chain computation.

### Core Components

1.  **`Will.sol` (Main Logic Contract):** Deployed on a source EVM chain (e.g., Ethereum Sepolia). This contract manages the creation of wills and the verification process. It does **not** store sensitive will details, only a hash for verification.

2.  **Backend API & Database (Node.js & MongoDB):** A private off-chain database that stores the encrypted details of the will (i.e., the specific assets and beneficiaries).

3.  **Cross-Chain Execution Framework (Chainlink CCIP):**
    * **`MainCoordinator.sol` (EVM):** The central hub on the source chain that initiates cross-chain commands.
    * **`LogicContractReceiver.sol` (EVM & SVM):** A trusted "hand" on each destination chain that receives commands from the MainCoordinator.
    * **`SmartWallet.sol` (EVM & SVM):** A personal vault contract deployed for each user on destination chains to hold their assets.

### Chainlink Services Used

* **Chainlink Automation:** Powers the time-based challenge period. It reliably and decentrally calls the `finalizeExecution` function after the 10-day challenge window has passed.
* **Chainlink Functions:** Acts as the "ultimate truth" for dispute resolution. If a will's initiation is challenged, Chainlink Functions securely calls our off-chain Death Database API to get a definitive answer, which is then reported back on-chain.
* **Chainlink CCIP (Cross-Chain Interoperability Protocol):** The backbone of our asset distribution. After a will is verified, our backend triggers CCIP messages to securely transfer assets from the deceased's `SmartWallet` contracts on any supported chain to the beneficiaries.

Architecture Flow

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

   * Creates a will from Sepolia network, and a tweet is posted to X.
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
   * Status is set to `ChallengePeriodActive`.
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

   * Chainlink Any API checks off-chain truth from Simulated Govt Database

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

## Chainlink Integrations

### ✅ 1. Chainlink CCIP (Cross-Chain Interoperability Protocol)

Used for **cross-chain asset + instruction transfer**.

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

## ElizaOS

### ✅ 1. Automated Tweets

Used to **build credibility for InheritChain** and ensure **transparency** by publicly confirming key actions taken on behalf of testators.

* **Trigger:** When a testator creates a will and clicks `Save Will`, a backend API call is triggered.
* **Location & Integration:** Implemented in `server.js`, where the ElizaOS agentic API is invoked using Eliza’s runtime.
* **Action:** A tweet is generated using agentic AI and Google API, then posted in real-time via the X API.

**Implementation Details:**

* Twitter integration handled via `twitter-api-v2`
* Eliza setup uses `elizaLogger`, `AgentRuntime`, and `ModelProviderName` from `@ai16z/eliza`
* Eliza character is configured in a `character` object
* `initializeEliza()` is called to initialize the agent
* Tweet generation is triggered via `POST /api/generate-tweet` route

**Benefits:**

* Builds **brand trust and visibility** for InheritChain
* Provides **assurance** to testators and beneficiaries that the platform is active and transparent
* Enhances **productivity** and **operational efficiency** by automating communication and reducing manual effort

---

##  Tech Stack

| Layer       | Tools                         |
| ----------- | ----------------------------- |
| Language    | Solidity, JavaScript          |
| Contracts   | Foundry                       |
| Frontend    | React + Tailwind              |
| Backend     | Node.js + Express             |
| Database    | MongoDB                       |
| Chainlink   | CCIP, Automation, Any API     |
| EVM Chains    | Sepolia, Polygon, Avalanche, Base      |
| AI Agent      |  ElizaOS               |

---

## 📂 Key Contracts

| Contract                    | Role                                      |
| --------------------------- | ----------------------------------------- |
| `Will.sol`          | Registers wills, stores on-chain metadata |
| `MainCoordinator.sol`       | Initiates inheritance CCIP requests       |
| `LogicContractReceiver.sol` | Executes instructions on target chains    |
| `SmartWallet.sol`           | Custodial vault per testator per chain    |
| `GettingStartedFunctionConsumer.sol`     | Chainlink Functions logic               |

---
## Setup and Installation


### A. Backend Setup (Node.js)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AnInsaneJimJam/Chainlink-Chromion
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd Chainlink-Chromion/backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Create a `.env` File**

   Add the following environment variables to your `.env` file:

   ```
   MONGO_URI=
   TWITTER_API_KEY=
   TWITTER_API_SECRET=
   TWITTER_ACCESS_TOKEN=
   TWITTER_ACCESS_TOKEN_SECRET=
   GOOGLE_API_KEY=
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

---

#### B. Frontend


1.  **Install dependencies:**

    ```bash
    cd ..
    cd frontend-new2
    npm install

2.  **Run Frontend:**
    ```bash
    npm run dev
    ```

---

## Demo Video
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

## 🚧 Future Work


* NFT-based proof of inheritance
* Dynamic Chainlink Functions integration

---

## 🤝 Contributing

Pull requests welcome! Please ensure PRs target a feature branch and include unit tests for Solidity functions.

---

## 📜 License

MIT
