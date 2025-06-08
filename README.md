# InheritChain - Digital Inheritance DApp

A decentralized application for managing digital inheritance across multiple blockchain networks.

## Features

- **Multi-Chain Support**: Ethereum, Solana, Base, Avalanche, Polygon
- **Digital Will Creation**: Create and manage wills with asset distribution
- **Beneficiary Management**: Add and manage beneficiaries with custom allocations
- **Asset Overview**: View all digital assets across different blockchains
- **Investigation Process**: Beneficiaries can initiate inheritance investigations
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd inheritchain-dapp
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── public/                 # Static files
│   ├── index.html         # HTML template
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots file
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   └── ui/           # shadcn/ui components
│   ├── pages/            # Page components
│   │   ├── testator/     # Testator-specific pages
│   │   └── beneficiary/  # Beneficiary-specific pages
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Mock data and constants
│   ├── lib/              # Utility functions
│   ├── App.js            # Main app component with routing
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
└── package.json          # Dependencies and scripts
\`\`\`

## Key Components

### Testator Flow
1. **Dashboard**: Overview of will status and quick actions
2. **Create Will**: Multi-step form for creating digital wills
3. **Edit Will**: Modify existing wills and beneficiaries
4. **Asset Management**: View and allocate multi-chain assets

### Beneficiary Flow
1. **Dashboard**: View inherited assets and investigation status
2. **Investigation**: Start inheritance claim processes
3. **Asset Details**: Detailed view of inherited assets

## Blockchain Integration

The app supports assets across:
- **Ethereum**: ETH + USDC
- **Solana**: SOL + USDC  
- **Base**: ETH + USDC
- **Avalanche**: AVAX + USDC
- **Polygon**: MATIC + USDC
- **Stablecoins**: Total USDC across chains
- **NFTs**: Cross-chain NFT collections

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding New Features

1. Create components in `src/components/` directory
2. Add pages in `src/pages/` directory
3. Use React Router for navigation
4. Follow the established patterns for state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
