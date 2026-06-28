/* =========================
   WALLET CONFIG
========================= */

const Wallet = {

    // Data dari Google Sheet
    raw: [],

    // Hasil request Moralis
    tokens: [],

    // Ringkasan
    summary: {

        totalUSD: 0,

        portfolios: {},

        totalWallets: 0,

        totalTokens: 0

    }

};


/* =========================
   MORALIS CONFIG
========================= */

const MORALIS = {

    API_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI5Njg2MDYxLTM5MDUtNDhmYi1hMjNjLTE1M2ExMWVkYTcxOSIsIm9yZ0lkIjoiNTIxNTEzIiwidXNlcklkIjoiNTM2NzE5IiwidHlwZUlkIjoiY2ZhZWZiM2ItNjYzNS00Zjk5LWFiOTMtZWMxMDZmODEzMGMzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3ODI2MTYyMzMsImV4cCI6NDkzODM3NjIzM30.NLTWyp4hjTLtEgb4HMfxhbadgW_6w6SudAwozrczi4o",

    BASE_URL:
    "https://deep-index.moralis.io/api/v2.2"

};


/* =========================
   SUPPORTED NETWORK
========================= */

const NETWORK = {

    evm: "eth",

    sol: "solana"

};


/* =========================
   CORE ASSET
========================= */

const CORE_ASSET = [

    "BTC",
    "ETH",
    "BNB",
    "SOL",

    "USDT",
    "USDC",
    "USDE",
    "FDUSD",
    "DAI"

];


/* =========================
   FILTER
========================= */

const WALLET_FILTER = {

    hideSpam: true,

    hideZeroUsd: true,

    minimumUsd: 0.01

};
