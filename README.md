# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BlockCert Verify

Trusted academic certificates — verifiable in seconds using blockchain.

## 🚀 Features
- Issue certificate hashes on-chain (testnet)
- Public verification (anyone can check authenticity)
- Revocation by issuer
- QR code for quick employer scanning
- Transparent, timestamped academic trust layer

## 🛠 Tech Stack
- Solidity (Ethereum)
- React + Vite + ethers.js
- MetaMask for wallet interaction

## 📌 Deploy Guide
See `smart-contract/deploy-instructions.md`.

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main/master branch:**
   - The workflow will automatically build and deploy on every push to `main` or `master`
   - You can also manually trigger it from the Actions tab

3. **Access your site:**
   - Your site will be available at: `https://[your-username].github.io/[repository-name]/`
   - The first deployment may take a few minutes

### Manual Deployment:
You can also manually trigger the deployment from the Actions tab → "Deploy to GitHub Pages" → "Run workflow"

## 👀 Demo Flow
1. Fill out details → Issue → MetaMask sign
2. QR generated ✔
3. Employer scans → auto-verify page loads

## 👑 Built by
Aethelstan 🛡
