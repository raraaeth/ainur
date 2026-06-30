/* =========================
   SOLANA API
========================= */

const SOLANA_BASE_URL =
"https://solana-gateway.moralis.io";

/* =========================
   FETCH SOLANA WALLET
========================= */

async function fetchSolanaWallet(address){

    try{

        const response = await fetch(

            `${SOLANA_BASE_URL}/account/mainnet/${address}/portfolio`
            {
                headers:{
                    "accept":"application/json",
                    "X-API-Key":MORALIS.API_KEY
                }
            }

        );

        console.log(
    "Solana Portfolio:",
    data
);

return [];

        console.log(
            "Solana Response:",
            data
        );

        const tokens =
        filterWalletTokens(
            data.tokens || data || []
        );

        console.log(
            "After Filter:",
            tokens
        );

        return tokens;

    }catch(error){

        console.error(
            "Solana Error:",
            error
        );

        return [];

    }

}
